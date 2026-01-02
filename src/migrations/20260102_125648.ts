import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_card_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_card_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE 'accent';
  ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE 'accent-dark';
  ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE 'secondary';
  ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE 'lavender';
  ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE 'light';
  ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE 'textbutton';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE 'accent';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE 'accent-dark';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE 'secondary';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE 'lavender';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE 'light';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE 'textbutton';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "card_color" "enum_pages_blocks_cta_card_color";
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "card_color" "enum__pages_v_blocks_cta_card_color";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default');
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum_pages_blocks_cta_links_link_appearance";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_cta_links_link_appearance" USING "link_appearance"::"public"."enum_pages_blocks_cta_links_link_appearance";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default');
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum__pages_v_blocks_cta_links_link_appearance";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" USING "link_appearance"::"public"."enum__pages_v_blocks_cta_links_link_appearance";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "card_color";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "card_color";
  DROP TYPE "public"."enum_pages_blocks_cta_card_color";
  DROP TYPE "public"."enum__pages_v_blocks_cta_card_color";`)
}
