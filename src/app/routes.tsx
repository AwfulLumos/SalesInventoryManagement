import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./layouts/Layout";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import Login from "../features/auth/pages/Login";
import Logout from "../features/auth/pages/Logout";
import POS from "../features/pos/pages/POS";
import Inventory from "../features/inventory/pages/Inventory";
import Customers from "../features/customers/pages/Customers";
import Financial from "../features/financial/pages/Financial";
import Reports from "../features/reports/pages/Reports";
import Users from "../features/users/pages/Users";
import Settings from "../features/settings/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/logout",
    Component: Logout,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: POS },
      { path: "inventory", Component: Inventory },
      { path: "customers", Component: Customers },
      { path: "financial", Component: Financial },
      { path: "reports", Component: Reports },
      { path: "users", Component: Users },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
