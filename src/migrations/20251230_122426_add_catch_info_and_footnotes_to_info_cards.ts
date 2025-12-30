import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Add catch_info and footnotes columns to info cards tables
    ALTER TABLE "pages_blocks_info_cards_info_cards" 
    ADD COLUMN "catch_info" jsonb;
    
    ALTER TABLE "pages_blocks_info_cards_info_cards" 
    ADD COLUMN "footnotes" jsonb;
    
    ALTER TABLE "_pages_v_blocks_info_cards_info_cards" 
    ADD COLUMN "catch_info" jsonb;
    
    ALTER TABLE "_pages_v_blocks_info_cards_info_cards" 
    ADD COLUMN "footnotes" jsonb;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Remove catch_info and footnotes columns
    ALTER TABLE "pages_blocks_info_cards_info_cards" 
    DROP COLUMN "catch_info";
    
    ALTER TABLE "pages_blocks_info_cards_info_cards" 
    DROP COLUMN "footnotes";
    
    ALTER TABLE "_pages_v_blocks_info_cards_info_cards" 
    DROP COLUMN "catch_info";
    
    ALTER TABLE "_pages_v_blocks_info_cards_info_cards" 
    DROP COLUMN "footnotes";
  `)
}
