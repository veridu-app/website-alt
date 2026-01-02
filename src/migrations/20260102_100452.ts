import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team_members_people" ADD COLUMN "qualification" varchar;
  ALTER TABLE "_pages_v_blocks_team_members_people" ADD COLUMN "qualification" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team_members_people" DROP COLUMN "qualification";
  ALTER TABLE "_pages_v_blocks_team_members_people" DROP COLUMN "qualification";`)
}
