import { Link, Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <main className="flex flex-col justify-center items-center">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Log In</Link>
      </nav>
      <Outlet />
    </main>
  )
}
