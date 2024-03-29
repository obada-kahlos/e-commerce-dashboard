import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import { Root } from "./routes/root";
import { Dashboard } from "./page/dashboard";
import { Products } from "./page/products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/Products",
        element: <Products />
      }
    ],
  },
]);
