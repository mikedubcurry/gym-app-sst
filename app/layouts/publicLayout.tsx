import { useState } from "react";
import { Link, Outlet } from "react-router";
import type { Route } from "./+types/publicLayout";
import { db } from "db/database";

export async function loader() {
  const gym = await db
    .selectFrom('gyms')
    .where('id', '=', 1)
    .selectAll()
    .executeTakeFirst()

  return gym!;
}

export default function PublicLayout({ loaderData: gym }: Route.ComponentProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main
      className="flex flex-col relative h-screen w-screen overflow-hidden"
    >
      <div className="">
        <div className="flex flex-col justify-center w-full bg-black py-4">
          <h1 className="text-2xl font-bold text-center text-brand">{gym.name}</h1>
          <img src="logo-dark.png" className="w-full" alt={gym.name + ' logo'} />
        </div>
        <button className="absolute bottom-0 right-0 border border-black w-20 h-20 rounded-full" onClick={() => setMenuOpen(!menuOpen)}>menu</button>
        <nav
          className={`transition-all w-3/4 h-full flex flex-col border border-black border-r-0 self-end absolute -right-full ${menuOpen && 'right-0'} top-0 bg-amber-200`}
          onClick={() => setMenuOpen(false)}
        >
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Log In</Link>
        </nav>
      </div>
      <div className="h-full" onClick={() => setMenuOpen(false)}>
        <Outlet />
      </div>
    </main>
  )
}
