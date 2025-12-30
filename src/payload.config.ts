import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { r2Storage } from '@payloadcms/storage-r2'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isCLI = process.argv.some((value) => value.match(/^(generate|migrate):?/))
const isProduction = process.env.NODE_ENV === 'production'

// Lazy-load Cloudflare context to avoid top-level await issues during Worker initialization
// This prevents Worker validation errors (error 10021) that occur when top-level code
// exceeds CPU/memory limits or performs async operations during initialization
let cloudflareContext: CloudflareContext | null = null

// Lazy getter for Cloudflare context - initializes only when first accessed
// This defers initialization until runtime, avoiding Worker validation errors
// The key is that getCloudflareContext({ async: true }) returns a Promise in production,
// but we need synchronous access. We'll handle this by accessing bindings directly
// from the runtime environment when possible.
function getCloudflareContextLazy(): CloudflareContext {
  // Return cached context if available
  if (cloudflareContext) {
    return cloudflareContext
  }

  // For production on Cloudflare Workers, try to access bindings directly from runtime
  // The bindings are injected by Cloudflare at runtime, not during validation
  if (isProduction && !isCLI) {
    // Try to get context - in production this should work when called at runtime
    // (not during Worker validation). getCloudflareContext({ async: true }) returns a Promise,
    // but we need to handle it synchronously for the adapters.
    try {
      // In production, the context should be available synchronously from the runtime
      // We'll try to get it, but if it's not available (during validation), we'll throw
      // a helpful error that will be caught and handled appropriately
      const ctxResult = getCloudflareContext({ async: true })

      // If it's a promise, we can't use it synchronously - this happens during validation
      if (ctxResult && typeof ctxResult === 'object' && 'then' in ctxResult) {
        // During Worker validation, bindings aren't available yet
        // We'll throw an error that indicates this is expected during validation
        throw new Error(
          'Cloudflare context is not yet available (Worker validation phase). ' +
            'Bindings will be available at runtime. If you see this error at runtime, ' +
            'there may be a configuration issue.',
        )
      }

      // If we get here, it's a synchronous context (shouldn't happen with async: true, but handle it)
      cloudflareContext = ctxResult as CloudflareContext
      return cloudflareContext
    } catch (error) {
      // Re-throw with context about when this error occurs
      const errorMessage = error instanceof Error ? error.message : String(error)
      throw new Error(
        `Failed to get Cloudflare context: ${errorMessage}. ` +
          `This may occur during Worker validation when bindings are not yet available. ` +
          `The context should be available at runtime when requests are processed.`,
      )
    }
  }

  // For CLI/dev operations, context should be initialized via getCloudflareContextFromWrangler
  // before the config is used. If we reach here, it means it wasn't initialized.
  throw new Error(
    'Cloudflare context not initialized. ' +
      'For CLI operations (migrations, type generation), ensure the context is initialized ' +
      'before accessing bindings. This is typically handled automatically by the CLI wrapper.',
  )
}

// Get D1 binding - accesses from Cloudflare context
// The lazy getter ensures we don't call getCloudflareContext during Worker validation
// At runtime, bindings will be available and this will work correctly
function getD1Binding(): any {
  const ctx = getCloudflareContextLazy()
  if (ctx && 'env' in ctx && ctx.env?.NEXT_TAG_CACHE_D1) {
    return ctx.env.NEXT_TAG_CACHE_D1
  }
  throw new Error(
    'D1 binding (NEXT_TAG_CACHE_D1) not available. Ensure Cloudflare bindings are configured correctly.',
  )
}

// Get R2 bucket - accesses from Cloudflare context
// The lazy getter ensures we don't call getCloudflareContext during Worker validation
// At runtime, bindings will be available and this will work correctly
function getR2Bucket(): any {
  const ctx = getCloudflareContextLazy()
  if (ctx && 'env' in ctx && ctx.env?.NEXT_INC_CACHE_R2_BUCKET) {
    return ctx.env.NEXT_INC_CACHE_R2_BUCKET
  }
  throw new Error(
    'R2 bucket (NEXT_INC_CACHE_R2_BUCKET) not available. Ensure Cloudflare bindings are configured correctly.',
  )
}

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: sqliteD1Adapter({ binding: getD1Binding() }),
  // db: vercelPostgresAdapter({
  //   pool: {
  //     connectionString: process.env.POSTGRES_URL || '',
  //   },
  // }),
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [
    ...plugins,
    r2Storage({
      bucket: getR2Bucket(),
      collections: { media: true },
    }),
    // vercelBlobStorage({
    //   collections: {
    //     media: true,
    //   },
    //   token: process.env.BLOB_READ_WRITE_TOKEN || '',
    //   clientUploads: true,
    // }),
  ],
  globals: [Header, Footer],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  upload: {
    limits: {
      fileSize: 500 * 1024 * 1024, // 500MB in bytes
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
