import { Link, Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <main className="flex flex-col">
      <h1>ADMIN LAYOUT</h1>
      <nav>
        <Link to="/admin/home">Home</Link>
        <Link to="/admin/members">Members</Link>
        <Link to="/admin/schedule">Schedule</Link>
      </nav>
      <Outlet />
    </main>
  )
}
