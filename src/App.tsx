import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./page/layout";
import Dashboard from "./page/dashboard";
import Product from "./page/product";
import Login from "./page/login";
function App() {
  function ProtectedRoute({ children }) {
    const user = localStorage.getItem("user");
    console.log(user);

    return user ? children : <Navigate to="/login" />;
  }
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/product",
          element: <Product />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
