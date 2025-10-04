/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "gym",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          // profile: input?.stage === "staging" ? "gym-staging" : "gym-prod"
          profile: 'gym'
        }
      }
    };
  },
  async run() {
    const web = new sst.aws.React("frontend");
    const vpc = new sst.aws.Vpc("db-vpc");

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
  },
});
