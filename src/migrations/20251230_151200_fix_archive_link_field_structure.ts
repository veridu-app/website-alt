import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Remove the JSONB link column (incorrect structure)
    ALTER TABLE "pages_blocks_archive" 
    DROP COLUMN IF EXISTS "link";
    
    ALTER TABLE "_pages_v_blocks_archive" 
    DROP COLUMN IF EXISTS "link";
    
    -- Create enum types for link_type
    DO $$ BEGIN
      CREATE TYPE "enum_pages_blocks_archive_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "enum_pages_blocks_archive_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "enum__pages_v_blocks_archive_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "enum__pages_v_blocks_archive_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    -- Add link fields as separate columns (matching the structure used in other link fields)
    ALTER TABLE "pages_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link_type" "enum_pages_blocks_archive_link_type" DEFAULT 'reference';
    
    ALTER TABLE "pages_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link_new_tab" boolean;
    
    ALTER TABLE "pages_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link_url" varchar;
    
    ALTER TABLE "pages_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link_label" varchar;
    
    ALTER TABLE "pages_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link_appearance" "enum_pages_blocks_archive_link_appearance" DEFAULT 'default';
    
    ALTER TABLE "pages_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link_show_arrow" boolean DEFAULT false;
    
    -- Add same fields to version table
    ALTER TABLE "_pages_v_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link_type" "enum__pages_v_blocks_archive_link_type" DEFAULT 'reference';
    
    ALTER TABLE "_pages_v_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link_new_tab" boolean;
    
    ALTER TABLE "_pages_v_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link_url" varchar;
    
    ALTER TABLE "_pages_v_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link_label" varchar;
    
    ALTER TABLE "_pages_v_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link_appearance" "enum__pages_v_blocks_archive_link_appearance" DEFAULT 'default';
    
    ALTER TABLE "_pages_v_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "link_show_arrow" boolean DEFAULT false;
    
    -- Create _rels table for relationship field in link group
    CREATE TABLE "pages_blocks_archive_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" varchar NOT NULL,
      "path" varchar NOT NULL,
      "pages_id" integer,
      "posts_id" integer
    );
    
    CREATE TABLE "_pages_v_blocks_archive_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "pages_id" integer,
      "posts_id" integer
    );
    
    -- Add foreign key constraints
    ALTER TABLE "pages_blocks_archive_rels" 
    ADD CONSTRAINT "pages_blocks_archive_rels_parent_fk" 
    FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_archive"("id") 
    ON DELETE cascade ON UPDATE no action;
    
    ALTER TABLE "pages_blocks_archive_rels" 
    ADD CONSTRAINT "pages_blocks_archive_rels_pages_fk" 
    FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") 
    ON DELETE cascade ON UPDATE no action;
    
    ALTER TABLE "pages_blocks_archive_rels" 
    ADD CONSTRAINT "pages_blocks_archive_rels_posts_fk" 
    FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") 
    ON DELETE cascade ON UPDATE no action;
    
    ALTER TABLE "_pages_v_blocks_archive_rels" 
    ADD CONSTRAINT "_pages_v_blocks_archive_rels_parent_fk" 
    FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_archive"("id") 
    ON DELETE cascade ON UPDATE no action;
    
    ALTER TABLE "_pages_v_blocks_archive_rels" 
    ADD CONSTRAINT "_pages_v_blocks_archive_rels_pages_fk" 
    FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") 
    ON DELETE cascade ON UPDATE no action;
    
    ALTER TABLE "_pages_v_blocks_archive_rels" 
    ADD CONSTRAINT "_pages_v_blocks_archive_rels_posts_fk" 
    FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") 
    ON DELETE cascade ON UPDATE no action;
    
    -- Create indexes for _rels tables
    CREATE INDEX "pages_blocks_archive_rels_order_idx" 
    ON "pages_blocks_archive_rels" USING btree ("order");
    
    CREATE INDEX "pages_blocks_archive_rels_parent_idx" 
    ON "pages_blocks_archive_rels" USING btree ("parent_id");
    
    CREATE INDEX "pages_blocks_archive_rels_path_idx" 
    ON "pages_blocks_archive_rels" USING btree ("path");
    
    CREATE INDEX "pages_blocks_archive_rels_pages_id_idx" 
    ON "pages_blocks_archive_rels" USING btree ("pages_id");
    
    CREATE INDEX "pages_blocks_archive_rels_posts_id_idx" 
    ON "pages_blocks_archive_rels" USING btree ("posts_id");
    
    CREATE INDEX "_pages_v_blocks_archive_rels_order_idx" 
    ON "_pages_v_blocks_archive_rels" USING btree ("order");
    
    CREATE INDEX "_pages_v_blocks_archive_rels_parent_idx" 
    ON "_pages_v_blocks_archive_rels" USING btree ("parent_id");
    
    CREATE INDEX "_pages_v_blocks_archive_rels_path_idx" 
    ON "_pages_v_blocks_archive_rels" USING btree ("path");
    
    CREATE INDEX "_pages_v_blocks_archive_rels_pages_id_idx" 
    ON "_pages_v_blocks_archive_rels" USING btree ("pages_id");
    
    CREATE INDEX "_pages_v_blocks_archive_rels_posts_id_idx" 
    ON "_pages_v_blocks_archive_rels" USING btree ("posts_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Drop _rels tables
    DROP TABLE IF EXISTS "pages_blocks_archive_rels" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_archive_rels" CASCADE;
    
    -- Remove link columns
    ALTER TABLE "pages_blocks_archive" 
    DROP COLUMN IF EXISTS "link_type";
    ALTER TABLE "pages_blocks_archive" 
    DROP COLUMN IF EXISTS "link_new_tab";
    ALTER TABLE "pages_blocks_archive" 
    DROP COLUMN IF EXISTS "link_url";
    ALTER TABLE "pages_blocks_archive" 
    DROP COLUMN IF EXISTS "link_label";
    ALTER TABLE "pages_blocks_archive" 
    DROP COLUMN IF EXISTS "link_appearance";
    ALTER TABLE "pages_blocks_archive" 
    DROP COLUMN IF EXISTS "link_show_arrow";
    
    ALTER TABLE "_pages_v_blocks_archive" 
    DROP COLUMN IF EXISTS "link_type";
    ALTER TABLE "_pages_v_blocks_archive" 
    DROP COLUMN IF EXISTS "link_new_tab";
    ALTER TABLE "_pages_v_blocks_archive" 
    DROP COLUMN IF EXISTS "link_url";
    ALTER TABLE "_pages_v_blocks_archive" 
    DROP COLUMN IF EXISTS "link_label";
    ALTER TABLE "_pages_v_blocks_archive" 
    DROP COLUMN IF EXISTS "link_appearance";
    ALTER TABLE "_pages_v_blocks_archive" 
    DROP COLUMN IF EXISTS "link_show_arrow";
    
    -- Restore JSONB column (for rollback)
    ALTER TABLE "pages_blocks_archive" 
    ADD COLUMN "link" jsonb;
    
    ALTER TABLE "_pages_v_blocks_archive" 
    ADD COLUMN "link" jsonb;
  `)
}
