import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_preview_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_feature_preview_background_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_preview_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_preview_background_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TABLE "pages_blocks_feature_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"description" jsonb,
  	"position" "enum_pages_blocks_feature_preview_position" DEFAULT 'left',
  	"background_color" "enum_pages_blocks_feature_preview_background_color",
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"description" jsonb,
  	"position" "enum__pages_v_blocks_feature_preview_position" DEFAULT 'left',
  	"background_color" "enum__pages_v_blocks_feature_preview_background_color",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_feature_preview" ADD CONSTRAINT "pages_blocks_feature_preview_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_preview" ADD CONSTRAINT "pages_blocks_feature_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_preview" ADD CONSTRAINT "_pages_v_blocks_feature_preview_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_preview" ADD CONSTRAINT "_pages_v_blocks_feature_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_feature_preview_order_idx" ON "pages_blocks_feature_preview" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_preview_parent_id_idx" ON "pages_blocks_feature_preview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_preview_path_idx" ON "pages_blocks_feature_preview" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_preview_media_idx" ON "pages_blocks_feature_preview" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_feature_preview_order_idx" ON "_pages_v_blocks_feature_preview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_preview_parent_id_idx" ON "_pages_v_blocks_feature_preview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_preview_path_idx" ON "_pages_v_blocks_feature_preview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_preview_media_idx" ON "_pages_v_blocks_feature_preview" USING btree ("media_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_feature_preview" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_preview" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_feature_preview_position";
  DROP TYPE "public"."enum_pages_blocks_feature_preview_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_feature_preview_position";
  DROP TYPE "public"."enum__pages_v_blocks_feature_preview_background_color";`)
}
