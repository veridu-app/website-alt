import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"quote" varchar,
  	"image_id" integer,
  	"school" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"quote" varchar,
  	"image_id" integer,
  	"school" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_testimonials" DROP CONSTRAINT "pages_blocks_testimonials_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_testimonials" DROP CONSTRAINT "_pages_v_blocks_testimonials_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_testimonials_image_idx";
  DROP INDEX "_pages_v_blocks_testimonials_image_idx";
  ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_testimonials_testimonials_order_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_testimonials_parent_id_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_testimonials_image_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_order_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_image_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("image_id");
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "name";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "quote";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "image_id";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "school";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "name";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "quote";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "school";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_testimonials_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_testimonials" CASCADE;
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "name" varchar;
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "quote" varchar;
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "school" varchar;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "name" varchar;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "quote" varchar;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "school" varchar;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_testimonials_image_idx" ON "pages_blocks_testimonials" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_testimonials_image_idx" ON "_pages_v_blocks_testimonials" USING btree ("image_id");`)
}
