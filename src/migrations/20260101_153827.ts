import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_info_cards_info_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."card_link_appearance" AS ENUM('default', 'accent', 'accent-dark', 'secondary', 'lavender', 'light', 'textbutton');
  CREATE TYPE "public"."enum_pages_blocks_info_cards_cards_per_row" AS ENUM('3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_info_cards_info_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_info_cards_cards_per_row" AS ENUM('3', '4');
  ALTER TABLE "pages_blocks_info_cards_info_cards" ADD COLUMN "link_type" "enum_pages_blocks_info_cards_info_cards_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_info_cards_info_cards" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_info_cards_info_cards" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_info_cards_info_cards" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_info_cards_info_cards" ADD COLUMN "link_appearance" "card_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_info_cards_info_cards" ADD COLUMN "link_show_arrow" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_info_cards" ADD COLUMN "cards_per_row" "enum_pages_blocks_info_cards_cards_per_row" DEFAULT '3';
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" ADD COLUMN "link_type" "enum__pages_v_blocks_info_cards_info_cards_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" ADD COLUMN "link_appearance" "card_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" ADD COLUMN "link_show_arrow" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_info_cards" ADD COLUMN "cards_per_row" "enum__pages_v_blocks_info_cards_cards_per_row" DEFAULT '3';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_info_cards_info_cards" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_info_cards_info_cards" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_info_cards_info_cards" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_info_cards_info_cards" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_info_cards_info_cards" DROP COLUMN "link_appearance";
  ALTER TABLE "pages_blocks_info_cards_info_cards" DROP COLUMN "link_show_arrow";
  ALTER TABLE "pages_blocks_info_cards" DROP COLUMN "cards_per_row";
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" DROP COLUMN "link_show_arrow";
  ALTER TABLE "_pages_v_blocks_info_cards" DROP COLUMN "cards_per_row";
  DROP TYPE "public"."enum_pages_blocks_info_cards_info_cards_link_type";
  DROP TYPE "public"."card_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_info_cards_cards_per_row";
  DROP TYPE "public"."enum__pages_v_blocks_info_cards_info_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_info_cards_cards_per_row";`)
}
