import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('gyms')
    .ifNotExists()
    .addColumn('id', 'serial', col => col.primaryKey().autoIncrement())
    .addColumn('name', 'varchar(128)', col => col.notNull().unique())
    .addColumn('address', 'varchar(128)')
    .addColumn('city', 'varchar(128)')
    .addColumn('state', 'varchar(2)')
    .addColumn('postal_code', 'varchar(10)')
    .addColumn('created_at', 'timestamp', col =>
      col.defaultTo(sql`now()`)
    )
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
}
