import type { Database } from "./types";
import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";

const dialect = new MysqlDialect({
  pool: createPool({
    database: 'gym',
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    connectionLimit: 10
  })
})

export const db = new Kysely<Database>({ dialect })
