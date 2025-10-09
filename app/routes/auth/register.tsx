import { useFormAction } from "react-router";
import type { Route } from "./+types/register";
import { functionalUpdate, useForm, type AnyFieldApi } from '@tanstack/react-form'
import { db } from "db/database";

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
  if (!first_name || !last_name ||!email) {
    return
  }

  db.insertInto('members').values({
    first_name,
    last_name,
    email,
    gym_id: 1
  })
}

export default function Register() {
  const form = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      form.reset()
    }
  });
  const action = useFormAction()

  return (
    <>
      <div>
        <form
          action={action}
          method="post"
        >
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
              <>
                <label htmlFor={field.name}>First Name:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
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
              <>
                <label htmlFor={field.name}>Last Name:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
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
              <>
                <label htmlFor={field.name}>Email:</label>
                <input
                  id={field.name}
                  type='email'
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />

          <button>submit</button>

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
