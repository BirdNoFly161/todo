import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../components/spinner";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthToken, setUser } from "../redux/user/userSlice";

import API from "../../api";

function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function init() {
      try {
        let response = await API.get("/users/token");
        if (response.status === 401) {
          return;
        }
        response = await response.json();
        dispatch(setAuthToken(response.token));
        dispatch(setUser(response.user));
        API.setAuthToken(response.token);
        //console.log(response);
        setLoading(false);
      } catch (error) {
        //console.log(error);
      }
    }
    init();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center p-6">
        {loading && <Spinner/>}
        {!loading && <Outlet />}
      </div>
      {
        <div className="w-full flex justify-center">
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
        </div>

      }
      <Toaster />
    </>
  );
}

export default Home;
