import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_columns_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_box_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_box_color" AS ENUM('off-white', 'frozen-green', 'lavender', 'dark-teal', 'cerulean', 'orange');
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "alignment" "enum_pages_blocks_content_columns_alignment" DEFAULT 'left';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "enable_box" boolean;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "box_color" "enum_pages_blocks_content_columns_box_color";
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "alignment" "enum__pages_v_blocks_content_columns_alignment" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "enable_box" boolean;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "box_color" "enum__pages_v_blocks_content_columns_box_color";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "alignment";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "enable_box";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "box_color";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "alignment";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "enable_box";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "box_color";
  DROP TYPE "public"."enum_pages_blocks_content_columns_alignment";
  DROP TYPE "public"."enum_pages_blocks_content_columns_box_color";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_box_color";`)
}
