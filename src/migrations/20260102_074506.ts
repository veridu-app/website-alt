import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."foreground_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  ALTER TABLE "pages_blocks_accordion_info" ADD COLUMN "foreground_color" "foreground_color";
  ALTER TABLE "_pages_v_blocks_accordion_info" ADD COLUMN "foreground_color" "foreground_color";
  ALTER TABLE "pages_blocks_accordion_info" DROP COLUMN "background_color";
  ALTER TABLE "_pages_v_blocks_accordion_info" DROP COLUMN "background_color";
  DROP TYPE "public"."enum_pages_blocks_accordion_info_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_info_background_color";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_accordion_info_background_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_info_background_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  ALTER TABLE "pages_blocks_accordion_info" ADD COLUMN "background_color" "enum_pages_blocks_accordion_info_background_color";
  ALTER TABLE "_pages_v_blocks_accordion_info" ADD COLUMN "background_color" "enum__pages_v_blocks_accordion_info_background_color";
  ALTER TABLE "pages_blocks_accordion_info" DROP COLUMN "foreground_color";
  ALTER TABLE "_pages_v_blocks_accordion_info" DROP COLUMN "foreground_color";
  DROP TYPE "public"."foreground_color";`)
}
