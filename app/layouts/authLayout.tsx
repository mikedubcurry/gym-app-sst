import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  // TODO: const { isauthenticated } = useAuth();
  // if (isAuthenticated) {
  //    return <Outlet />
  // } else {
  //    return <Navigate to="/login" replace />
  // }

  return (
    <main className="flex flex-col justify-center items-center">
      <nav>
        <Link to="/account">Account</Link>
      </nav>
      <Outlet />
    </main>
  )
}

