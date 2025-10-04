/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    const { stage } = input
    const profile = stage === 'prod' || stage === 'staging' ? 'default' : 'gym'
    return {
      name: "gym",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile
        }
      }
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("db-vpc", {
      nat: 'ec2',
      bastion: true
    });

    const db = new sst.aws.Mysql("database", {
      vpc,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      dev: {
        username: 'root',
        password: 'password',
        database: 'gym',
        port: 3306,
      },
    });
    const web = new sst.aws.React("frontend", {
      link: [db],
      vpc
    });

    return {
      app: web.url,
      db_host: db.host,
    }
  },
});
