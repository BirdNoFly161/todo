import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../components/spinner";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthToken, setUser } from "../redux/user/userSlice";
import API from "../../api";

function Root() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function init() {
      try {
        let response = await API.get("/users/token");
        if (response.status === 401) {
          setLoading(false);
          return;
        }
        dispatch(setAuthToken(response.token));
        dispatch(setUser(response.user));
        API.setAuthToken(response.token);
        //console.log(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    init();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center p-6">
        {loading && <Spinner />}
        {!loading && <Outlet />}
      </div>
      <Toaster />
    </>
  );
}

export default Root;
