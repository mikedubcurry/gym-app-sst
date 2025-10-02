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
    new sst.aws.React("MyWeb");
  },
});
