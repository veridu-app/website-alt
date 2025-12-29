import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_info_cards_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"image_id" integer
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
  
  CREATE TABLE "_pages_v_blocks_info_cards_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_info_cards" ADD CONSTRAINT "pages_blocks_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_cards_info_cards" ADD CONSTRAINT "pages_blocks_info_cards_info_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_cards_info_cards" ADD CONSTRAINT "pages_blocks_info_cards_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_info_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_cards" ADD CONSTRAINT "_pages_v_blocks_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" ADD CONSTRAINT "_pages_v_blocks_info_cards_info_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" ADD CONSTRAINT "_pages_v_blocks_info_cards_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_info_cards"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_info_cards_order_idx" ON "pages_blocks_info_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_info_cards_parent_id_idx" ON "pages_blocks_info_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_info_cards_path_idx" ON "pages_blocks_info_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_info_cards_info_cards_order_idx" ON "pages_blocks_info_cards_info_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_info_cards_info_cards_parent_id_idx" ON "pages_blocks_info_cards_info_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_info_cards_info_cards_image_idx" ON "pages_blocks_info_cards_info_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_info_cards_order_idx" ON "_pages_v_blocks_info_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_info_cards_parent_id_idx" ON "_pages_v_blocks_info_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_info_cards_path_idx" ON "_pages_v_blocks_info_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_info_cards_info_cards_order_idx" ON "_pages_v_blocks_info_cards_info_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_info_cards_info_cards_parent_id_idx" ON "_pages_v_blocks_info_cards_info_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_info_cards_info_cards_image_idx" ON "_pages_v_blocks_info_cards_info_cards" USING btree ("image_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_info_cards_info_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_info_cards_info_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_info_cards_info_cards" CASCADE;
  DROP TABLE "pages_blocks_info_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_info_cards" CASCADE;`)
}
