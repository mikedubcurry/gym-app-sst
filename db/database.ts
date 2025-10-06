import type { Database } from "./types";
import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";
import { Resource } from "sst";

const stage = process.env.NODE_ENV
const isDev = stage === 'development'

const dialect = new MysqlDialect({
  pool: createPool({
    database: isDev ? 'gym' : Resource?.database.database,
    host: isDev ? 'localhost' : Resource?.database.host,
    user: isDev ? 'root' : Resource?.database.username,
    password: isDev ? 'password' : Resource?.database.password,
    port: isDev ? 3306 : Resource?.database.port,
    connectionLimit: 10
  })
})

export const db = new Kysely<Database>({ dialect })
