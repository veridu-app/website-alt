import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Add show_view_all_link boolean field to archive block
    ALTER TABLE "pages_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "show_view_all_link" boolean DEFAULT false;
    
    -- Add link group field as JSONB to archive block
    ALTER TABLE "pages_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link" jsonb;
    
    -- Add same fields to version table for drafts
    ALTER TABLE "_pages_v_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "show_view_all_link" boolean DEFAULT false;
    
    ALTER TABLE "_pages_v_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link" jsonb;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Remove link field from archive block
    ALTER TABLE "pages_blocks_archive" 
    DROP COLUMN IF EXISTS "link";
    
    -- Remove show_view_all_link field from archive block
    ALTER TABLE "pages_blocks_archive" 
    DROP COLUMN IF EXISTS "show_view_all_link";
    
    -- Remove same fields from version table
    ALTER TABLE "_pages_v_blocks_archive" 
    DROP COLUMN IF EXISTS "link";
    
    ALTER TABLE "_pages_v_blocks_archive" 
    DROP COLUMN IF EXISTS "show_view_all_link";
  `)
}

