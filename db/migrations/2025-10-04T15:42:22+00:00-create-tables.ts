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

  await db.schema
    .createTable('members')
    .ifNotExists()
    .addColumn('id', 'serial', col => col.primaryKey().autoIncrement())
    .addColumn('first_name', 'varchar(64)', col => col.notNull())
    .addColumn('last_name', 'varchar(64)', col => col.notNull())
    .addColumn('email', 'varchar(64)', col => col.notNull().unique())
    .addColumn('created_at', 'timestamp', col =>
      col.defaultTo(sql`now()`)
    )
    .addColumn('gym_id', 'integer', col => col.references('gyms.id'))
    .execute()

  await db.schema
    .createTable('schedules')
    .ifNotExists()
    .addColumn('id', 'serial', col => col.primaryKey().autoIncrement())
    .addColumn('gym_id', 'integer', col => col.references('gyms.id'))
    .addColumn('time_start', 'varchar(5)', col => col.notNull())
    .addColumn('day', 'varchar(8)', col => col.notNull())
    .addColumn('duration', 'integer', col => col.notNull())
    .execute()

  await db.schema
    .createTable('roles')
    .ifNotExists()
    .addColumn('id', 'serial', col => col.primaryKey().autoIncrement())
    .addColumn('name', 'varchar(64)', col => col.notNull().unique())
    .execute()

  await db.schema
    .alterTable('members')
    .addColumn('role_id', 'integer', col => col.references('roles.id'))
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
}
