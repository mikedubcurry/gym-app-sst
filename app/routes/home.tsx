import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gym App" },
    { name: "description", content: "Gym app" },
  ];
}

export async function action({
  request
}: Route.ActionArgs) {

}

export default function Home() {
  return <Welcome />;
}
