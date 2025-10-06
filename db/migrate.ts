import { db } from 'db/database'
import { promises as fs } from "fs";
import * as path from 'path'
import { FileMigrationProvider, Migrator } from "kysely";

const migrateToLatest = async () => {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: './migrations'
    })
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach(res => {
    if (res.status === 'Success') {
      console.log(`migration "${res.migrationName}" was executed successfully`)
    } else if (res.status === 'Error') {
      console.error(`failed to execute migration "${res.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

export const handler = async () => {
  await migrateToLatest()
}
