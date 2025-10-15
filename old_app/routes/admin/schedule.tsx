import type { Route } from "./+types/schedule";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Admin Schedule" },
    { name: "description", content: "Admin Schedule Page" },
  ];
}

export default function AdminSchedule() {
  return (
    <>
      <p>Admin Schedule</p>
    </>
  );
}





