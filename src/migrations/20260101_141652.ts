import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_accordion_info_accordion_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."item_link_app" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  CREATE TYPE "public"."enum_pages_blocks_accordion_info_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_accordion_info_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_info_accordion_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_info_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_info_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light');
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" ADD COLUMN "show_button" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" ADD COLUMN "link_type" "enum_pages_blocks_accordion_info_accordion_items_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" ADD COLUMN "link_appearance" "item_link_app" DEFAULT 'default';
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" ADD COLUMN "link_show_arrow" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_accordion_info" ADD COLUMN "show_view_all_link" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_accordion_info" ADD COLUMN "link_type" "enum_pages_blocks_accordion_info_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_accordion_info" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_accordion_info" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_accordion_info" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_accordion_info" ADD COLUMN "link_appearance" "enum_pages_blocks_accordion_info_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_accordion_info" ADD COLUMN "link_show_arrow" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" ADD COLUMN "show_button" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" ADD COLUMN "link_type" "enum__pages_v_blocks_accordion_info_accordion_items_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" ADD COLUMN "link_appearance" "item_link_app" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" ADD COLUMN "link_show_arrow" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_accordion_info" ADD COLUMN "show_view_all_link" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_accordion_info" ADD COLUMN "link_type" "enum__pages_v_blocks_accordion_info_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_accordion_info" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_accordion_info" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_accordion_info" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_accordion_info" ADD COLUMN "link_appearance" "enum__pages_v_blocks_accordion_info_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_accordion_info" ADD COLUMN "link_show_arrow" boolean DEFAULT false;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_accordion_info_accordion_items" DROP COLUMN "show_button";
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" DROP COLUMN "link_appearance";
  ALTER TABLE "pages_blocks_accordion_info_accordion_items" DROP COLUMN "link_show_arrow";
  ALTER TABLE "pages_blocks_accordion_info" DROP COLUMN "show_view_all_link";
  ALTER TABLE "pages_blocks_accordion_info" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_accordion_info" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_accordion_info" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_accordion_info" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_accordion_info" DROP COLUMN "link_appearance";
  ALTER TABLE "pages_blocks_accordion_info" DROP COLUMN "link_show_arrow";
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" DROP COLUMN "show_button";
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_accordion_info_accordion_items" DROP COLUMN "link_show_arrow";
  ALTER TABLE "_pages_v_blocks_accordion_info" DROP COLUMN "show_view_all_link";
  ALTER TABLE "_pages_v_blocks_accordion_info" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_accordion_info" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_accordion_info" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_accordion_info" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_accordion_info" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_accordion_info" DROP COLUMN "link_show_arrow";
  DROP TYPE "public"."enum_pages_blocks_accordion_info_accordion_items_link_type";
  DROP TYPE "public"."item_link_app";
  DROP TYPE "public"."enum_pages_blocks_accordion_info_link_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_info_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_info_accordion_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_info_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_info_link_appearance";`)
}
