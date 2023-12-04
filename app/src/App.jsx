import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Root from "./scenes";
import SignIn from "./scenes/signin";
import Signup from "./scenes/signup";
import Users from "./scenes/user";
import Tasks from "./scenes/task";
import Task from "./scenes/task/task";
import Dashboard from "./scenes/dashboard";
import { loader as taskLoader } from "./scenes/task/task";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Tasks />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <SignIn />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/tasks/:taskId",
          element: <Task />,
          loader: taskLoader,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
