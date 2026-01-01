import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_accordion_info_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"expanded_content" jsonb
  );
  
  CREATE TABLE "pages_blocks_accordion_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_info_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"expanded_content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" ADD CONSTRAINT "pages_blocks_accordion_info_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_info" ADD CONSTRAINT "pages_blocks_accordion_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" ADD CONSTRAINT "_pages_v_blocks_accordion_info_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_info" ADD CONSTRAINT "_pages_v_blocks_accordion_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_accordion_info_accordion_items_order_idx" ON "pages_blocks_accordion_info_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_info_accordion_items_parent_id_idx" ON "pages_blocks_accordion_info_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_info_order_idx" ON "pages_blocks_accordion_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_info_parent_id_idx" ON "pages_blocks_accordion_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_info_path_idx" ON "pages_blocks_accordion_info" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_accordion_info_accordion_items_order_idx" ON "_pages_v_blocks_accordion_info_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_info_accordion_items_parent_id_idx" ON "_pages_v_blocks_accordion_info_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_info_order_idx" ON "_pages_v_blocks_accordion_info" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_info_parent_id_idx" ON "_pages_v_blocks_accordion_info" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_info_path_idx" ON "_pages_v_blocks_accordion_info" USING btree ("_path");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_accordion_info_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_accordion_info" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_info_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_info" CASCADE;`)
}
