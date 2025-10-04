import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { db } from "db/database";
import { addTime, capitalize, formatTime } from "~/utils";
import { Link } from "react-router";

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

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date();
  const dayName = days[today.getDay()];
  const schedule = await db
    .selectFrom('schedules')
    .where('gym_id', '=', gym!.id)
    .where('day', '=', dayName)
    .selectAll()
    .execute();

  return {
    gym,
    schedule,
  };
}

export default function Home({ loaderData: { gym, schedule } }: Route.ComponentProps) {
  const sortedSchedule = schedule.sort((a, b) => {
    if (a?.time_start > b?.time_start) return 1
    else return -1
  }).map(s => {
    return {
      ...s,
      time_start: formatTime(s.time_start),
      time_end: formatTime(addTime(s.time_start, s.duration))
    }
  })
  return (
    <div className="min-h-screen px-2">
      <section className="mb-8">
        <h1 className="font-bold text-center text-3xl my-6">{gym?.name}</h1>
        <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis libero, ex possimus doloremque alias </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-center mb-4">{capitalize(schedule[0]?.day)}'s Classes</h2>
        {sortedSchedule.map(sched => (
          <div key={sched?.id} className="mb-4 border-l-4 pl-4 border-brand">
            <p>{sched?.class}</p>
            <p>{sched?.time_start.toString()} - {sched?.time_end}</p>
          </div>
        ))}
      </section>

      <section className="mb-8 flex flex-col items-center gap-4">
        <h2 className="text-2xl text-center">Join Today</h2>
        <Link to="/register" className="bg-brand text-center w-full max-w-1/2 rounded p-2">
          <span className="text-white">Create an Account</span>
        </Link>
        <Link to="/login" className="bg-brand text-center w-full max-w-1/2 rounded p-2">
          <span>Log In</span>
        </Link>
      </section>

      {/* TODO: add images to gym table/s3 */}
      <section className="mb-8 flex flex-col items-center gap-4">
        <h2 className="text-2xl text-center">Photos</h2>
        <img src="https://picsum.photos/200/200" alt="" />
        <img src="https://picsum.photos/200/200" alt="" />
        <img src="https://picsum.photos/200/200" alt="" />
      </section>
    </div>
  );
}
