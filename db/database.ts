import type { Database } from "./types";
import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";
import { Resource } from "sst";

const dialect = new MysqlDialect({
  pool: createPool({
    database: Resource.database.database,
    host: Resource.database.host,
    user: Resource.database.username,
    password: Resource.database.password,
    port: Resource.database.port,
    connectionLimit: 10
  })
})

export const db = new Kysely<Database>({ dialect })
