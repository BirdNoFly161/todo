import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom';
import Home from './scenes';
import './App.css'

function App() {

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
  ],
);

  return (
    <RouterProvider router={router} />
  )
}

export default App
