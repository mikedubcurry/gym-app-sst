import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  layout('./layouts/publicLayout.tsx', [
    index("routes/home.tsx"),
    route('/register', './routes/auth/register.tsx'),
    route('/login', './routes/auth/login.tsx'),
  ]),
  layout('./layouts/authLayout.tsx', [
    route('/account', './routes/account/root.tsx'),
    route('/account/edit', './routes/account/edit.tsx'),
  ]),
  layout('./layouts/adminLayout.tsx', [
    ...prefix('/admin', [
      route('/home', './routes/admin/home.tsx'),
      route('/members', './routes/admin/members.tsx'),
      route('/schedule', './routes/admin/schedule.tsx'),
    ])
  ])
] satisfies RouteConfig;
