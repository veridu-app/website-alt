import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Add background_color column to match what Payload queries for
    -- This column will be a copy of bg_color to maintain compatibility
    ALTER TABLE "pages_blocks_feature_preview_feature_previews" 
    ADD COLUMN "background_color" "enum_pages_blocks_feature_preview_feature_previews_bg_color";
    
    ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" 
    ADD COLUMN "background_color" "enum__pages_v_blocks_feature_preview_feature_previews_bg_color";
    
    -- Copy data from bg_color to background_color
    UPDATE "pages_blocks_feature_preview_feature_previews" 
    SET "background_color" = "bg_color";
    
    UPDATE "_pages_v_blocks_feature_preview_feature_previews" 
    SET "background_color" = "bg_color";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_feature_preview_feature_previews" 
    DROP COLUMN "background_color";
    
    ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" 
    DROP COLUMN "background_color";
  `)
}
