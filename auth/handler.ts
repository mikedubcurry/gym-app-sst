import { handle } from "hono/aws-lambda";
import { issuer } from "@openauthjs/openauth";
import { CodeProvider } from "@openauthjs/openauth/provider/code";
import { subjects } from "./subjects";

const app = issuer({
  subjects,
  providers: {
    code: CodeProvider()
  },
  success: async (ctx, value) => {
    console.log(ctx)
    console.log(value)
  }
});

export const handler = handle(app);
