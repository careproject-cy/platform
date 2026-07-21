import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  DROP INDEX "posts_slug_idx";
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE UNIQUE INDEX "slug_location_idx" ON "dogs" USING btree ("slug","location");
  CREATE INDEX "version_slug_version_location_idx" ON "_dogs_v" USING btree ("version_slug","version_location");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_roles" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_roles" CASCADE;
  DROP INDEX "slug_location_idx";
  DROP INDEX "version_slug_version_location_idx";
  DROP INDEX "posts_slug_idx";
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  DROP TYPE "public"."enum_users_roles";`)
}
