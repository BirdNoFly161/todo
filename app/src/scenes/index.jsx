import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"

function Home() {


  return (
    <>
    <Navbar/>
    <div className="flex flex-col justify-center items-center p-6"><Outlet/></div>
    <Toaster/>
    </>
  )
}

export default Home