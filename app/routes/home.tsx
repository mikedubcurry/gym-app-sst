import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { db } from "db/database";
import { useOutletContext } from "react-router";
import type { Gym } from "db/types";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Gym App" },
    { name: "description", content: "Gym app" },
  ];
}

export async function loader() {
  const gym = await db
    .selectFrom('gyms')
    .where('id', '=', 1)
    .selectAll()
    .executeTakeFirst()

  return gym!;
}

export default function Home() {
  const gym: Gym = useOutletContext()
  console.log(gym)
  return (
    <>
      <h1 className="font-bold text-3xl">{"d"}</h1>
    </>
  );
}
