import { db } from "db/database";
import { redirect } from "react-router";
import { userContext } from "~/context";
import { getSession } from '~/sessions.server'


export const authMiddleware = async ({
  request,
  context
}) => {
  const session = await getSession(request)
  const userId = session.get('userId') as number | undefined // TODO: make uuid string

  if (!userId) {
    throw redirect('/login')
  }

  const user = await db
    .selectFrom('members')
    .where('id', '=', userId)
    .execute();
  context.set(userContext, user)
}
