import { commitSession, getSession } from "~/sessions.server";
import type { Route } from "./+types/login";
import { data, redirect, useActionData, useFormAction } from "react-router";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { FieldInfo } from "~/components/FieldInfo";
import type { Ref } from "react";

// TODO implement this function for real
function validateCredentials({
  email,
  password
}: {
  email: string;
  password: string
}) {
  return '123-abc-456'
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Log in to your account!" },
  ];
}

export async function loader({
  request
}: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('userId')) {
    return redirect('/account')
  }

  return data(
    { error: session.get('error') },
    {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    })
}

export async function action({
  request
}: Route.ActionArgs) {
  const session = await getSession(
    request.headers.get('Cookie')
  )
  const form = await request.formData()
  const email = form.get('email') as string
  const password = form.get('password') as string

  const userId = validateCredentials({ email, password })

  if (userId == null) {
    session.flash("error", "Invalid email/pasword")
    return redirect('/login', {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    })
  }

  session.set('userId', userId)

  return redirect('/account', {
    headers: {
      'Set-Cookie': await commitSession(session)
    }
  })
}

export default function Login() {
  const actionData = useActionData();
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const action = useFormAction()
  const FormField = ({
    field,
    label,
    ref,
    inputType,
  }: {
    field: AnyFieldApi,
    label: string
    ref?: Ref<HTMLInputElement>
    inputType?: 'email' | 'password'
  }) => {
    return (
      <div className="flex flex-col justify-center ">
        <label htmlFor={field.name}>{label}:</label>
        <input
          className="bg-gray-200 rounded-lg p-2 text-black"
          type={inputType && inputType}
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}
        />
        <FieldInfo field={field} />
      </div>
    )
  }
  return (
    <>
      <div>
        <form method="post" action={action}>
          <div>
            {actionData?.error && (
              <p>{actionData.error}</p>
            )}

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'An email is required'
                    : value.length > 64
                      ? 'Maximum letter count exceeded'
                      : undefined,
              }}
              children={(field) => (
                <FormField inputType="email" field={field} label="Email" />
              )}
            />

            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'A password is required'
                    : value.length > 64
                      ? 'Maximum letter count exceeded'
                      : undefined,
              }}
              children={(field) => (
                <FormField inputType="password" field={field} label="Password" />
              )}
            />

            <button>submit</button>

          </div>
        </form>
      </div>
    </>
  );
}
