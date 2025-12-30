import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_archive_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_archive_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  CREATE TYPE "public"."bg_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum_pages_blocks_info_cards_info_cards_background_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum_pages_blocks_info_cards_info_cards_catch_info_position" AS ENUM('between', 'floating');
  CREATE TYPE "public"."banner_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  CREATE TYPE "public"."enum__pages_v_blocks_info_cards_info_cards_background_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum__pages_v_blocks_info_cards_info_cards_catch_info_position" AS ENUM('between', 'floating');
  CREATE TABLE "pages_blocks_info_cards_info_cards_footnotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_info_cards_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"image_id" integer,
  	"background_color" "enum_pages_blocks_info_cards_info_cards_background_color",
  	"catch_info_enabled" boolean DEFAULT false,
  	"catch_info_value" varchar,
  	"catch_info_text" varchar,
  	"catch_info_position" "enum_pages_blocks_info_cards_info_cards_catch_info_position" DEFAULT 'between',
  	"catch_info_banner_color" "banner_color"
  );
  
  CREATE TABLE "pages_blocks_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_info_cards_info_cards_footnotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_info_cards_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"image_id" integer,
  	"background_color" "enum__pages_v_blocks_info_cards_info_cards_background_color",
  	"catch_info_enabled" boolean DEFAULT false,
  	"catch_info_value" varchar,
  	"catch_info_text" varchar,
  	"catch_info_position" "enum__pages_v_blocks_info_cards_info_cards_catch_info_position" DEFAULT 'between',
  	"catch_info_banner_color" "banner_color",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" DROP CONSTRAINT "pages_blocks_feature_preview_feature_previews_parent_id_fk";
  
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" DROP CONSTRAINT "_pages_v_blocks_feature_preview_feature_previews_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" DROP CONSTRAINT "pages_blocks_feature_preview_feature_previews_parent_id_fk";
  
  DROP INDEX "pages_blocks_feature_preview_feature_previews_order_idx";
  DROP INDEX "pages_blocks_feature_preview_feature_previews_parent_id_idx";
  DROP INDEX "pages_blocks_feature_preview_feature_previews_media_idx";
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ALTER COLUMN "_parent_id" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ALTER COLUMN "id" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ALTER COLUMN "position" DROP DEFAULT;
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ALTER COLUMN "position" SET DATA TYPE "public"."enum_pages_blocks_feature_preview_feature_previews_position" USING "position"::text::"public"."enum_pages_blocks_feature_preview_feature_previews_position";
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ALTER COLUMN "position" SET DEFAULT 'left';
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "show_view_all_link" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "link_type" "enum_pages_blocks_archive_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "link_appearance" "enum_pages_blocks_archive_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "link_show_arrow" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "show_view_all_link" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "link_type" "enum__pages_v_blocks_archive_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "link_appearance" "enum__pages_v_blocks_archive_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "link_show_arrow" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ADD COLUMN "background_color" "bg_color";
  ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" ADD COLUMN "background_color" "bg_color";
  ALTER TABLE "pages_blocks_info_cards_info_cards_footnotes" ADD CONSTRAINT "pages_blocks_info_cards_info_cards_footnotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_info_cards_info_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_cards_info_cards" ADD CONSTRAINT "pages_blocks_info_cards_info_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_cards_info_cards" ADD CONSTRAINT "pages_blocks_info_cards_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_info_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_cards" ADD CONSTRAINT "pages_blocks_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards_footnotes" ADD CONSTRAINT "_pages_v_blocks_info_cards_info_cards_footnotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_info_cards_info_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" ADD CONSTRAINT "_pages_v_blocks_info_cards_info_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" ADD CONSTRAINT "_pages_v_blocks_info_cards_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_info_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_cards" ADD CONSTRAINT "_pages_v_blocks_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_info_cards_info_cards_footnotes_order_idx" ON "pages_blocks_info_cards_info_cards_footnotes" USING btree ("_order");
  CREATE INDEX "pages_blocks_info_cards_info_cards_footnotes_parent_id_idx" ON "pages_blocks_info_cards_info_cards_footnotes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_info_cards_info_cards_order_idx" ON "pages_blocks_info_cards_info_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_info_cards_info_cards_parent_id_idx" ON "pages_blocks_info_cards_info_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_info_cards_info_cards_image_idx" ON "pages_blocks_info_cards_info_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_info_cards_order_idx" ON "pages_blocks_info_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_info_cards_parent_id_idx" ON "pages_blocks_info_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_info_cards_path_idx" ON "pages_blocks_info_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_info_cards_info_cards_footnotes_order_idx" ON "_pages_v_blocks_info_cards_info_cards_footnotes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_info_cards_info_cards_footnotes_parent_id_idx" ON "_pages_v_blocks_info_cards_info_cards_footnotes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_info_cards_info_cards_order_idx" ON "_pages_v_blocks_info_cards_info_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_info_cards_info_cards_parent_id_idx" ON "_pages_v_blocks_info_cards_info_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_info_cards_info_cards_image_idx" ON "_pages_v_blocks_info_cards_info_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_info_cards_order_idx" ON "_pages_v_blocks_info_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_info_cards_parent_id_idx" ON "_pages_v_blocks_info_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_info_cards_path_idx" ON "_pages_v_blocks_info_cards" USING btree ("_path");
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ADD CONSTRAINT "pages_blocks_feature_preview_feature_previews_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ADD CONSTRAINT "pages_blocks_feature_preview_feature_previews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_preview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" ADD CONSTRAINT "_pages_v_blocks_feature_preview_feature_previews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_preview"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_pages_v_blocks_feature_preview_feature_previews_order_idx" ON "_pages_v_blocks_feature_preview_feature_previews" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_preview_feature_previews_parent_id_idx" ON "_pages_v_blocks_feature_preview_feature_previews" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_preview_feature_previews_media_idx" ON "_pages_v_blocks_feature_preview_feature_previews" USING btree ("media_id");
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" DROP COLUMN "bg_color";
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" DROP COLUMN "_uuid";
  ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" DROP COLUMN "bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_feature_preview_position";
  DROP TYPE "public"."enum__pages_v_blocks_feature_preview_background_color";
  DROP TYPE "public"."enum_pages_blocks_feature_preview_feature_previews_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_feature_preview_feature_previews_bg_color";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum__pages_v_blocks_feature_preview_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_preview_background_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum_pages_blocks_feature_preview_feature_previews_bg_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_preview_feature_previews_bg_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  ALTER TABLE "pages_blocks_info_cards_info_cards_footnotes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_info_cards_info_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_info_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards_footnotes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_info_cards" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_info_cards_info_cards_footnotes" CASCADE;
  DROP TABLE "pages_blocks_info_cards_info_cards" CASCADE;
  DROP TABLE "pages_blocks_info_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_info_cards_info_cards_footnotes" CASCADE;
  DROP TABLE "_pages_v_blocks_info_cards_info_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_info_cards" CASCADE;
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" DROP CONSTRAINT "pages_blocks_feature_preview_feature_previews_media_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" DROP CONSTRAINT "pages_blocks_feature_preview_feature_previews_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" DROP CONSTRAINT "_pages_v_blocks_feature_preview_feature_previews_parent_id_fk";
  
  DROP INDEX "_pages_v_blocks_feature_preview_feature_previews_order_idx";
  DROP INDEX "_pages_v_blocks_feature_preview_feature_previews_parent_id_idx";
  DROP INDEX "_pages_v_blocks_feature_preview_feature_previews_media_idx";
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ALTER COLUMN "position" DROP DEFAULT;
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ALTER COLUMN "position" SET DATA TYPE "public"."enum__pages_v_blocks_feature_preview_feature_previews_position" USING "position"::text::"public"."enum__pages_v_blocks_feature_preview_feature_previews_position";
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ALTER COLUMN "position" SET DEFAULT 'left';
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ADD COLUMN "bg_color" "enum__pages_v_blocks_feature_preview_feature_previews_bg_color";
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" ADD COLUMN "_uuid" varchar;
  ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" ADD COLUMN "bg_color" "enum__pages_v_blocks_feature_preview_feature_previews_bg_color";
  ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" ADD CONSTRAINT "pages_blocks_feature_preview_feature_previews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_preview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" ADD CONSTRAINT "_pages_v_blocks_feature_preview_feature_previews_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_feature_preview_feature_previews_order_idx" ON "_pages_v_blocks_feature_preview_feature_previews" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_preview_feature_previews_parent_id_idx" ON "_pages_v_blocks_feature_preview_feature_previews" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_preview_feature_previews_media_idx" ON "_pages_v_blocks_feature_preview_feature_previews" USING btree ("media_id");
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "show_view_all_link";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "link_appearance";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "link_show_arrow";
  ALTER TABLE "pages_blocks_feature_preview_feature_previews" DROP COLUMN "background_color";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "show_view_all_link";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "link_show_arrow";
  ALTER TABLE "_pages_v_blocks_feature_preview_feature_previews" DROP COLUMN "background_color";
  DROP TYPE "public"."enum_pages_blocks_archive_link_type";
  DROP TYPE "public"."enum_pages_blocks_archive_link_appearance";
  DROP TYPE "public"."bg_color";
  DROP TYPE "public"."enum_pages_blocks_info_cards_info_cards_background_color";
  DROP TYPE "public"."enum_pages_blocks_info_cards_info_cards_catch_info_position";
  DROP TYPE "public"."banner_color";
  DROP TYPE "public"."enum__pages_v_blocks_archive_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_archive_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_info_cards_info_cards_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_info_cards_info_cards_catch_info_position";`)
}
