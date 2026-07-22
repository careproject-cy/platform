import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "dogs" ADD COLUMN "birth_date" timestamp(3) with time zone;
  ALTER TABLE "_dogs_v" ADD COLUMN "version_birth_date" timestamp(3) with time zone;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "dogs" DROP COLUMN "birth_date";
  ALTER TABLE "_dogs_v" DROP COLUMN "version_birth_date";`)
}
