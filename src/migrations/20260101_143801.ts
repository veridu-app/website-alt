import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE 'textbutton';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'textbutton';
  ALTER TYPE "public"."enum_pages_blocks_archive_link_appearance" ADD VALUE 'textbutton';
  ALTER TYPE "public"."item_link_app" ADD VALUE 'textbutton';
  ALTER TYPE "public"."enum_pages_blocks_accordion_info_link_appearance" ADD VALUE 'textbutton';
  ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE 'textbutton';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'textbutton';
  ALTER TYPE "public"."enum__pages_v_blocks_archive_link_appearance" ADD VALUE 'textbutton';
  ALTER TYPE "public"."enum__pages_v_blocks_accordion_info_link_appearance" ADD VALUE 'textbutton';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum_pages_hero_links_link_appearance";
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_hero_links_link_appearance" USING "link_appearance"::"public"."enum_pages_hero_links_link_appearance";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum_pages_blocks_content_columns_link_appearance";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum_pages_blocks_content_columns_link_appearance";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_archive_link_appearance";
  CREATE TYPE "public"."enum_pages_blocks_archive_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum_pages_blocks_archive_link_appearance";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_archive_link_appearance" USING "link_appearance"::"public"."enum_pages_blocks_archive_link_appearance";
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."item_link_app";
  CREATE TYPE "public"."item_link_app" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."item_link_app";
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."item_link_app" USING "link_appearance"::"public"."item_link_app";
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."item_link_app";
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."item_link_app" USING "link_appearance"::"public"."item_link_app";
  ALTER TABLE "pages_blocks_accordion_info" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_accordion_info" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_accordion_info_link_appearance";
  CREATE TYPE "public"."enum_pages_blocks_accordion_info_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  ALTER TABLE "pages_blocks_accordion_info" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum_pages_blocks_accordion_info_link_appearance";
  ALTER TABLE "pages_blocks_accordion_info" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_accordion_info_link_appearance" USING "link_appearance"::"public"."enum_pages_blocks_accordion_info_link_appearance";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum__pages_v_version_hero_links_link_appearance";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_version_hero_links_link_appearance" USING "link_appearance"::"public"."enum__pages_v_version_hero_links_link_appearance";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum__pages_v_blocks_content_columns_link_appearance";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum__pages_v_blocks_content_columns_link_appearance";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_blocks_archive_link_appearance";
  CREATE TYPE "public"."enum__pages_v_blocks_archive_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum__pages_v_blocks_archive_link_appearance";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_archive_link_appearance" USING "link_appearance"::"public"."enum__pages_v_blocks_archive_link_appearance";
  ALTER TABLE "_pages_v_blocks_accordion_info" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_accordion_info" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_blocks_accordion_info_link_appearance";
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_info_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  ALTER TABLE "_pages_v_blocks_accordion_info" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum__pages_v_blocks_accordion_info_link_appearance";
  ALTER TABLE "_pages_v_blocks_accordion_info" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_accordion_info_link_appearance" USING "link_appearance"::"public"."enum__pages_v_blocks_accordion_info_link_appearance";`)
}
