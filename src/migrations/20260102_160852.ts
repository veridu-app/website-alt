import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_link_categories_links_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "footer_link_categories_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_link_categories_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_show_arrow" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_link_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  DROP TABLE "footer_nav_items" CASCADE;
  ALTER TABLE "footer" ADD COLUMN "contact_email" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_linked_in" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_instagram" varchar;
  ALTER TABLE "footer_link_categories_links" ADD CONSTRAINT "footer_link_categories_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_link_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_categories" ADD CONSTRAINT "footer_link_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_link_categories_links_order_idx" ON "footer_link_categories_links" USING btree ("_order");
  CREATE INDEX "footer_link_categories_links_parent_id_idx" ON "footer_link_categories_links" USING btree ("_parent_id");
  CREATE INDEX "footer_link_categories_order_idx" ON "footer_link_categories" USING btree ("_order");
  CREATE INDEX "footer_link_categories_parent_id_idx" ON "footer_link_categories" USING btree ("_parent_id");
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_show_arrow" boolean DEFAULT false
  );
  
  DROP TABLE "footer_link_categories_links" CASCADE;
  DROP TABLE "footer_link_categories" CASCADE;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  ALTER TABLE "footer" DROP COLUMN "contact_email";
  ALTER TABLE "footer" DROP COLUMN "contact_linked_in";
  ALTER TABLE "footer" DROP COLUMN "contact_instagram";
  DROP TYPE "public"."enum_footer_link_categories_links_link_type";`)
}
