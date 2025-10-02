import type { Route } from "./+types/login";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Log in to your account!" },
  ];
}

export default function Login() {
  return (
    <>
      <p>login</p>
    </>
  );
}


