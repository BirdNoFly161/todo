import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Root from "./scenes";
import Home from "./scenes/home";
import SignIn from "./scenes/signin";
import Signup from "./scenes/signup";
import Users from "./scenes/user";
import Tasks from "./scenes/task";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/home",
          element: <Home />,
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
          path: "/tasks",
          element: <Tasks />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
