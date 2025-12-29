import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_preview_feature_previews_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_feature_preview_feature_previews_bg_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_preview_feature_previews_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_preview_feature_previews_bg_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  
  CREATE TABLE "pages_blocks_feature_preview_feature_previews" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"description" jsonb,
  	"position" "enum_pages_blocks_feature_preview_feature_previews_position" DEFAULT 'left',
  	"bg_color" "enum_pages_blocks_feature_preview_feature_previews_bg_color"
  );
  
  CREATE TABLE "_pages_v_blocks_feature_preview_feature_previews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"description" jsonb,
  	"position" "enum__pages_v_blocks_feature_preview_feature_previews_position" DEFAULT 'left',
  	"bg_color" "enum__pages_v_blocks_feature_preview_feature_previews_bg_color",
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ADD CONSTRAINT "pages_blocks_feature_preview_feature_previews_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ADD CONSTRAINT "pages_blocks_feature_preview_feature_previews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_preview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" ADD CONSTRAINT "_pages_v_blocks_feature_preview_feature_previews_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" ADD CONSTRAINT "_pages_v_blocks_feature_preview_feature_previews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_preview"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_feature_preview_feature_previews_order_idx" ON "pages_blocks_feature_preview_feature_previews" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_preview_feature_previews_parent_id_idx" ON "pages_blocks_feature_preview_feature_previews" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_preview_feature_previews_media_idx" ON "pages_blocks_feature_preview_feature_previews" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_feature_preview_feature_previews_order_idx" ON "_pages_v_blocks_feature_preview_feature_previews" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_preview_feature_previews_parent_id_idx" ON "_pages_v_blocks_feature_preview_feature_previews" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_preview_feature_previews_media_idx" ON "_pages_v_blocks_feature_preview_feature_previews" USING btree ("media_id");
  
  ALTER TABLE "pages_blocks_feature_preview" DROP CONSTRAINT "pages_blocks_feature_preview_media_id_media_id_fk";
  ALTER TABLE "_pages_v_blocks_feature_preview" DROP CONSTRAINT "_pages_v_blocks_feature_preview_media_id_media_id_fk";
  DROP INDEX "pages_blocks_feature_preview_media_idx";
  DROP INDEX "_pages_v_blocks_feature_preview_media_idx";
  
  ALTER TABLE "pages_blocks_feature_preview" ADD COLUMN "title" jsonb;
  ALTER TABLE "_pages_v_blocks_feature_preview" ADD COLUMN "title" jsonb;
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "title" jsonb;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "title" jsonb;
  
  ALTER TABLE "pages_blocks_feature_preview" DROP COLUMN "media_id";
  ALTER TABLE "pages_blocks_feature_preview" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_feature_preview" DROP COLUMN "position";
  ALTER TABLE "pages_blocks_feature_preview" DROP COLUMN "background_color";
  ALTER TABLE "_pages_v_blocks_feature_preview" DROP COLUMN "media_id";
  ALTER TABLE "_pages_v_blocks_feature_preview" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_feature_preview" DROP COLUMN "position";
  ALTER TABLE "_pages_v_blocks_feature_preview" DROP COLUMN "background_color";
  
  DROP TYPE "public"."enum_pages_blocks_feature_preview_position";
  DROP TYPE "public"."enum_pages_blocks_feature_preview_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_feature_preview_position";
  DROP TYPE "public"."enum__pages_v_blocks_feature_preview_background_color";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_preview_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_feature_preview_background_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_preview_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_preview_background_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  
  ALTER TABLE "pages_blocks_feature_preview" ADD COLUMN "media_id" integer;
  ALTER TABLE "pages_blocks_feature_preview" ADD COLUMN "description" jsonb;
  ALTER TABLE "pages_blocks_feature_preview" ADD COLUMN "position" "enum_pages_blocks_feature_preview_position" DEFAULT 'left';
  ALTER TABLE "pages_blocks_feature_preview" ADD COLUMN "background_color" "enum_pages_blocks_feature_preview_background_color";
  ALTER TABLE "_pages_v_blocks_feature_preview" ADD COLUMN "media_id" integer;
  ALTER TABLE "_pages_v_blocks_feature_preview" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v_blocks_feature_preview" ADD COLUMN "position" "enum__pages_v_blocks_feature_preview_position" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_feature_preview" ADD COLUMN "background_color" "enum__pages_v_blocks_feature_preview_background_color";
  
  ALTER TABLE "pages_blocks_feature_preview" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_feature_preview" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "title";
  
  ALTER TABLE "pages_blocks_feature_preview" ADD CONSTRAINT "pages_blocks_feature_preview_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_preview" ADD CONSTRAINT "_pages_v_blocks_feature_preview_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_feature_preview_media_idx" ON "pages_blocks_feature_preview" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_feature_preview_media_idx" ON "_pages_v_blocks_feature_preview" USING btree ("media_id");
  
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_feature_preview_feature_previews" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_preview_feature_previews" CASCADE;
  
  DROP TYPE "public"."enum_pages_blocks_feature_preview_feature_previews_position";
  DROP TYPE "public"."enum_pages_blocks_feature_preview_feature_previews_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_feature_preview_feature_previews_position";
  DROP TYPE "public"."enum__pages_v_blocks_feature_preview_feature_previews_bg_color";`)
}
