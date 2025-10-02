import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main className="flex flex-col justify-center items-center">
      <nav>
        <Link to="/account">Account</Link>
      </nav>
      <Outlet />
    </main>
  )
}

