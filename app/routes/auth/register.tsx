import type { Route } from "./+types/register";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Create an account and join this gym!" },
  ];
}

export default function Register() {
  return (
    <>
      <div>
      register
      </div>
    </>
  );
}

