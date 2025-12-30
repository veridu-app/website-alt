import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Create enum types for background color
    CREATE TYPE "public"."enum_pages_blocks_info_cards_info_cards_bg_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
    CREATE TYPE "public"."enum__pages_v_blocks_info_cards_info_cards_bg_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
    
    -- Add bg_color column to info cards tables
    ALTER TABLE "pages_blocks_info_cards_info_cards" 
    ADD COLUMN "bg_color" "enum_pages_blocks_info_cards_info_cards_bg_color";
    
    ALTER TABLE "_pages_v_blocks_info_cards_info_cards" 
    ADD COLUMN "bg_color" "enum__pages_v_blocks_info_cards_info_cards_bg_color";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Remove bg_color columns
    ALTER TABLE "pages_blocks_info_cards_info_cards" 
    DROP COLUMN "bg_color";
    
    ALTER TABLE "_pages_v_blocks_info_cards_info_cards" 
    DROP COLUMN "bg_color";
    
    -- Drop enum types
    DROP TYPE "public"."enum_pages_blocks_info_cards_info_cards_bg_color";
    DROP TYPE "public"."enum__pages_v_blocks_info_cards_info_cards_bg_color";
  `)
}
