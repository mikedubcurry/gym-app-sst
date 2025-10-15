import { handle } from "hono/aws-lambda";
import { issuer } from "@openauthjs/openauth";
import { CodeProvider } from "@openauthjs/openauth/provider/code";
import { CodeUI } from '@openauthjs/openauth/ui/code'
import { subjects } from "./subjects";

async function getUser(email: string) {
  return '123'
}

const app = issuer({
  subjects,
  providers: {
    code: CodeProvider(
      CodeUI({
        copy: {
          code_info: "We'll send a pin code to your email"
        },
        sendCode: async (claims, code) => { console.log(claims, code) }
      })
    )
  },
  success: async (ctx, value) => {
    console.log(ctx)
    console.log(value)
    if (value.provider === "code") {
      return ctx.subject("user", {
        id: await getUser(value.claims.email)
      })
    }
  }
});

export const handler = handle(app);
