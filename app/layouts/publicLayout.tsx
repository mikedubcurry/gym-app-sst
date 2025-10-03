import { createContext, useEffect, useState } from "react";
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
      <div className="flex justify-between border border-black py-8 px-4">
        <h1 className="">
          <Link to="/">{gym.name}</Link>
        </h1>
        <button onClick={() => setMenuOpen(!menuOpen)}>menu</button>
        <nav
          className={`transition-all w-3/4 h-full flex flex-col border border-black border-r-0 self-end absolute -right-full ${menuOpen && 'right-0'} top-0 bg-amber-200`}
          onClick={() => setMenuOpen(false)}
        >
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Log In</Link>
        </nav>
      </div>
      <Outlet />
    </main>
  )
}
