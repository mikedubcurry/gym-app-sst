import { redirect, useActionData, useFormAction } from "react-router";
import type { Route } from "./+types/register";
import { useForm, type AnyFieldApi } from '@tanstack/react-form'
import { db } from "db/database";
import { useEffect, useRef, type Ref } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Create an account and join this gym!" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const first_name = formData.get('first_name')?.toString()
  const last_name = formData.get('last_name')?.toString()
  const email = formData.get('email')?.toString()
  if (!first_name || !last_name || !email) {
    return
  }

  try {
    await db.insertInto('members').values({
      first_name,
      last_name,
      email,
      gym_id: 1,
      role_id: 3,
    }).execute();

    return redirect('/')
  } catch (err) {
    return {
      error: `Email: ${email} already in use. Try a different email, or log in.`,
      first_name,
      last_name,
    }
  }
}

export default function Register() {
  const actionData = useActionData();
  const form = useForm({
    defaultValues: {
      first_name: actionData?.first_name ?? '',
      last_name: actionData?.last_name ?? '',
      email: '',
    },
  });
  const action = useFormAction()

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (ref.current) {
      t = setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth' }), 200)
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
    return () => clearTimeout(t)
  }, [])

  const FormField = ({
    field,
    label,
    ref
  }: {
    field: AnyFieldApi,
    label: string
    ref?: Ref<HTMLInputElement>
  }) => {
    return (
      <div className="flex flex-col justify-center ">
        <label htmlFor={field.name}>{label}:</label>
        <input
          className="bg-gray-200 rounded-lg p-2 text-black"
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
      <div className="">
        <form
          action={action}
          method="post"
        >
          <div className="flex flex-col gap-8 bg-slate-700 p-4" ref={ref}>
            {actionData?.error && (
              <p>{actionData.error}</p>
            )}
            <form.Field
              name="first_name"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'A first name is required'
                    : value.length > 64
                      ? 'Maximum letter count exceeded'
                      : undefined,
              }}
              children={(field) => (
                <FormField field={field} label="First Name" />
              )}
            />

            <form.Field
              name="last_name"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'A last name is required'
                    : value.length > 64
                      ? 'Maximum letter count exceeded'
                      : undefined,
              }}
              children={(field) => (
                <FormField field={field} label="Last Name" />
              )}
            />

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'An email is required'
                    : !value.includes('@') || !value.includes('.')
                      ? 'Must enter a valid email'
                      : value.length > 64
                        ? 'Maximum letter count exceeded'
                        : undefined,
              }}
              children={(field) => (
                <FormField field={field} label="Email" />
              )}
            />

            <button>submit</button>

          </div>
        </form>
      </div>
    </>
  );
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(', ')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}
