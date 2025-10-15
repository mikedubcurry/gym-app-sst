import type { Route } from "./+types/members";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Admin Membsers" },
    { name: "description", content: "Admin Members Page" },
  ];
}

export default function AdminMembers() {
  return (
    <>
      <p>Admin Members</p>
    </>
  );
}




