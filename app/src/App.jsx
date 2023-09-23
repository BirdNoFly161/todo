import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Home from "./scenes";
import Login from "./scenes/login";
import Signup from "./scenes/signup";
import "./App.css";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: "/signup",
                    element: <Signup />,
                },
                {
                    path: "/login",
                    element: <Login />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
