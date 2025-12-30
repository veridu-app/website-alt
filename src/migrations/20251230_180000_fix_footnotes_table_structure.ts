import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Remove the incorrect JSONB footnotes column
    ALTER TABLE "pages_blocks_info_cards_info_cards" 
    DROP COLUMN IF EXISTS "footnotes";
    
    ALTER TABLE "_pages_v_blocks_info_cards_info_cards" 
    DROP COLUMN IF EXISTS "footnotes";
    
    -- Create the proper footnotes join table for published pages
    CREATE TABLE "pages_blocks_info_cards_info_cards_footnotes" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL,
      "url" varchar
    );
    
    -- Create the proper footnotes join table for versions
    CREATE TABLE "_pages_v_blocks_info_cards_info_cards_footnotes" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL,
      "url" varchar,
      "_uuid" varchar
    );
    
    -- Add foreign key constraints
    ALTER TABLE "pages_blocks_info_cards_info_cards_footnotes" 
    ADD CONSTRAINT "pages_blocks_info_cards_info_cards_footnotes_parent_id_fk" 
    FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_info_cards_info_cards"("id") 
    ON DELETE cascade ON UPDATE no action;
    
    ALTER TABLE "_pages_v_blocks_info_cards_info_cards_footnotes" 
    ADD CONSTRAINT "_pages_v_blocks_info_cards_info_cards_footnotes_parent_id_fk" 
    FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_info_cards_info_cards"("id") 
    ON DELETE cascade ON UPDATE no action;
    
    -- Create indexes
    CREATE INDEX "pages_blocks_info_cards_info_cards_footnotes_order_idx" 
    ON "pages_blocks_info_cards_info_cards_footnotes" USING btree ("_order");
    
    CREATE INDEX "pages_blocks_info_cards_info_cards_footnotes_parent_id_idx" 
    ON "pages_blocks_info_cards_info_cards_footnotes" USING btree ("_parent_id");
    
    CREATE INDEX "_pages_v_blocks_info_cards_info_cards_footnotes_order_idx" 
    ON "_pages_v_blocks_info_cards_info_cards_footnotes" USING btree ("_order");
    
    CREATE INDEX "_pages_v_blocks_info_cards_info_cards_footnotes_parent_id_idx" 
    ON "_pages_v_blocks_info_cards_info_cards_footnotes" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Drop the footnotes tables
    DROP TABLE IF EXISTS "pages_blocks_info_cards_info_cards_footnotes" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_info_cards_info_cards_footnotes" CASCADE;
    
    -- Restore the JSONB columns (for rollback, though this is incorrect)
    ALTER TABLE "pages_blocks_info_cards_info_cards" 
    ADD COLUMN "footnotes" jsonb;
    
    ALTER TABLE "_pages_v_blocks_info_cards_info_cards" 
    ADD COLUMN "footnotes" jsonb;
  `)
}

