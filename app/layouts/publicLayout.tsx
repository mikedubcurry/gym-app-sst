import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router";
import type { Route } from "./+types/publicLayout";
import { db } from "db/database";
import { MenuButton } from "~/components/menuBtn";

export async function loader() {
  const gym = await db
    .selectFrom('gyms')
    .where('id', '=', 1)
    .selectAll()
    .executeTakeFirst()

  return gym
}

export default function PublicLayout({ loaderData: gym }: Route.ComponentProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollY = e.target.scrollTop;
      const max = 5;
      const factor = 900;
      const value = Math.min(scrollY / factor, 1) * max;
      if (heroRef.current) {
        heroRef.current.style.filter = `blur(${value}px)`;
        heroRef.current.style.transform = `translateZ(${-value * 10}px)`
      }
    }
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll)
    }

  }, [])

  return (
    <div className="relative overflow-x-hidden">
      <main
        className="flex flex-col relative h-screen w-screen overflow-x-hidden"
        ref={containerRef}
        onClick={() => setMenuOpen(false)}
      >
        <div className="bg-black sticky top-0 z-0 perspective-near">
          <div ref={heroRef} className="flex flex-col justify-center w-full bg-black py-4 transition-all duration-100">
            <img src="logo-dark.png" alt={gym?.name + ' logo'} className="w-full" />
          </div>
        </div>
        <div className="z-10 bg-black text-white border-t" onClick={() => setMenuOpen(false)}>
          <Outlet />
          <footer className="text-center py-2">Michael Curry 2025</footer>
        </div>
        <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </main>
      <nav
        className={`z-20 transition-all duration-500 w-3/4 h-full flex flex-col border border-black border-r-0 self-end absolute -right-full ${menuOpen && 'right-0'} top-0 bg-slate-700`}
      >
        <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
        <Link onClick={() => setMenuOpen(false)} to="/register">Register</Link>
        <Link onClick={() => setMenuOpen(false)} to="/login">Log In</Link>
      </nav>
    </div>
  )
}
