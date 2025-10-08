import { Sequelize } from 'sequelize'
import { Umzug, SequelizeStorage } from 'umzug'
import { Resource } from 'sst'

export const handler = async (event: any) => {
  const dbUrl = `mysql://${Resource.database.username}:${Resource.database.password}@${Resource.database.host}:${Resource.database.port}/${Resource.database.database}` // process.env.DATABASE_URL!

  const sequelize = new Sequelize(dbUrl, {
    dialect: 'mysql',
    logging: console.log
  })

  const migrator = new Umzug({
    migrations: { glob: 'migrations/*.js' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console
  })

  console.log('running pending migrations')
  const migs = await migrator.pending()
  console.log(migs)
  await migrator.up();
  console.log('finished migrations')

  await sequelize.close();
}
