import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_team_members_people_background_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum_pages_blocks_team_members_cards_per_row" AS ENUM('3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_team_members_people_background_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum__pages_v_blocks_team_members_cards_per_row" AS ENUM('3', '4');
  CREATE TABLE "pages_blocks_team_members_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"job_description" varchar,
  	"description" jsonb,
  	"linked_in_url" varchar,
  	"email" varchar,
  	"background_color" "enum_pages_blocks_team_members_people_background_color"
  );
  
  CREATE TABLE "pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cards_per_row" "enum_pages_blocks_team_members_cards_per_row" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"job_description" varchar,
  	"description" jsonb,
  	"linked_in_url" varchar,
  	"email" varchar,
  	"background_color" "enum__pages_v_blocks_team_members_people_background_color",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cards_per_row" "enum__pages_v_blocks_team_members_cards_per_row" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_team_members_people" ADD CONSTRAINT "pages_blocks_team_members_people_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members_people" ADD CONSTRAINT "pages_blocks_team_members_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members_people" ADD CONSTRAINT "_pages_v_blocks_team_members_people_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members_people" ADD CONSTRAINT "_pages_v_blocks_team_members_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_team_members_people_order_idx" ON "pages_blocks_team_members_people" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_people_parent_id_idx" ON "pages_blocks_team_members_people" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_people_image_idx" ON "pages_blocks_team_members_people" USING btree ("image_id");
  CREATE INDEX "pages_blocks_team_members_order_idx" ON "pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_parent_id_idx" ON "pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_path_idx" ON "pages_blocks_team_members" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_members_people_order_idx" ON "_pages_v_blocks_team_members_people" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_people_parent_id_idx" ON "_pages_v_blocks_team_members_people" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_people_image_idx" ON "_pages_v_blocks_team_members_people" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_team_members_order_idx" ON "_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_parent_id_idx" ON "_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_path_idx" ON "_pages_v_blocks_team_members" USING btree ("_path");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_team_members_people" CASCADE;
  DROP TABLE "pages_blocks_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members_people" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_team_members_people_background_color";
  DROP TYPE "public"."enum_pages_blocks_team_members_cards_per_row";
  DROP TYPE "public"."enum__pages_v_blocks_team_members_people_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_team_members_cards_per_row";`)
}
