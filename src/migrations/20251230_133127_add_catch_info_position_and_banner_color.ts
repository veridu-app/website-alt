import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // No database changes needed - catch_info is JSONB and can contain new properties
  // This migration documents the addition of 'position' and 'banner_color' fields
  // to the catch_info group field structure
  await db.execute(sql`
    -- Migration: Added position, banner_color, and enabled fields to catch_info group
    -- catch_info JSONB structure now supports:
    -- { enabled?: boolean, value?: string, text: string, position?: 'between' | 'floating', banner_color?: string }
    -- No schema changes required as JSONB is flexible
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // No rollback needed - JSONB fields are flexible
  // The position and banner_color properties can simply be ignored if not present
  await db.execute(sql`
    -- No rollback needed for JSONB field structure changes
  `)
}
