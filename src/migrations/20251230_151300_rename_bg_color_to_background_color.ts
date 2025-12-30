import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Rename bg_color to background_color in info cards tables
    -- Payload expects background_color (snake_case of backgroundColor field name)
    ALTER TABLE "pages_blocks_info_cards_info_cards" 
    RENAME COLUMN "bg_color" TO "background_color";
    
    ALTER TABLE "_pages_v_blocks_info_cards_info_cards" 
    RENAME COLUMN "bg_color" TO "background_color";
    
    -- Rename the enum types to match
    ALTER TYPE "enum_pages_blocks_info_cards_info_cards_bg_color" 
    RENAME TO "enum_pages_blocks_info_cards_info_cards_background_color";
    
    ALTER TYPE "enum__pages_v_blocks_info_cards_info_cards_bg_color" 
    RENAME TO "enum__pages_v_blocks_info_cards_info_cards_background_color";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Rename back to bg_color
    ALTER TABLE "pages_blocks_info_cards_info_cards" 
    RENAME COLUMN "background_color" TO "bg_color";
    
    ALTER TABLE "_pages_v_blocks_info_cards_info_cards" 
    RENAME COLUMN "background_color" TO "bg_color";
    
    -- Rename enum types back
    ALTER TYPE "enum_pages_blocks_info_cards_info_cards_background_color" 
    RENAME TO "enum_pages_blocks_info_cards_info_cards_bg_color";
    
    ALTER TYPE "enum__pages_v_blocks_info_cards_info_cards_background_color" 
    RENAME TO "enum__pages_v_blocks_info_cards_info_cards_bg_color";
  `)
}
