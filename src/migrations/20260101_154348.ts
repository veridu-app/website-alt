import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_info_cards_info_cards" ADD COLUMN "show_button" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" ADD COLUMN "show_button" boolean DEFAULT false;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_info_cards_info_cards" DROP COLUMN "show_button";
  ALTER TABLE "_pages_v_blocks_info_cards_info_cards" DROP COLUMN "show_button";`)
}
