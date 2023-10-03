import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch} from "react-redux";
import { setAuthToken, setUser } from "../redux/user/userSlice";

import API from "../../api";

function Home() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function init() {
      let response = await API.get("/users/token");
      response = await response.json();
      dispatch(setAuthToken(response.token));
      dispatch(setUser(response.user));
      API.setAuthToken(response.token)
      console.log(response);
    }
    init();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center p-6">
        <Outlet />
      </div>
      {
        <button
          className="flex justify-center w-1/3 bg-secondary hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent rounded px-2 py-1"
          onClick={async () => {
            setLoading(true);
            let response = await API.get("/users/token");
            response = await response.json();
            setLoading(false);
            console.log(response);
          }}
        >
          {loading ? "Loading" : "Test the token ! "}
        </button>
      }
      <Toaster />
    </>
  );
}

export default Home;
