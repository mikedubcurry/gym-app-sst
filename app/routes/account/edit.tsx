import { Link } from "react-router";
import type { Route } from "./+types/edit";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Account Edit" },
    { name: "description", content: "Account Edit Page" },
  ];
}

export default function AccountEdit() {
  return (
    <>
      <p>Account Edit</p>
      <Link to="/account">Go Back</Link>
    </>
  );
}




