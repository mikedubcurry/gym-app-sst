import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Admin Home" },
    { name: "description", content: "Admin Home Page" },
  ];
}

export default function AdminHome() {
  return (
    <>
      <p>Admin Home</p>
    </>
  );
}



