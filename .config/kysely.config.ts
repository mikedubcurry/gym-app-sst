import {
	DummyDriver,
	MysqlDriver,
	PostgresIntrospector,
	PostgresQueryCompiler,
} from 'kysely'
import { defineConfig } from 'kysely-ctl'

export default defineConfig({
	// replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
	dialect: {
		createAdapter() {
          return new MysqlDriver({
            

          })
		},
		createDriver() {
			return new DummyDriver()
		},
		createIntrospector(db) {
			return new PostgresIntrospector(db)
		},
		createQueryCompiler() {
			return new PostgresQueryCompiler()
		},
	},
	   migrations: {
	     migrationFolder: "../db/migrations",
	   },
	//   plugins: [],
	//   seeds: {
	//     seedFolder: "seeds",
	//   }
})
