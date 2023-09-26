import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"

function Home() {


  return (
    <>
    <Navbar/>
    <div className="flex flex-col justify-center items-center p-6"><Outlet/></div>
    </>
  )
}

export default Home