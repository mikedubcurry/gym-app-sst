import { Link } from "react-router";
import type { Route } from "./+types/root";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Account" },
    { name: "description", content: "Account Page" },
  ];
}

export default function AccountRoot() {
  return (
    <>
      <p>Account Page</p>
      <Link to="/account/edit">Edit Account</Link>
    </>
  );
}





