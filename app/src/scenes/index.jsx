import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../components/spinner";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthToken, setUser } from "../redux/user/userSlice";
import { setSelectedFolder } from "../redux/user/folderSlice";
import API from "../../api";
import "../App.css";

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
        dispatch(setSelectedFolder(response.user.folders[0]));
        console.log(
          "trying to set selected folder with: ",
          response.user.folders[0],
        );
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
      <div className="flex bg-background h-[calc(100vh-3rem)]">
        <Sidebar loading={loading} />
        <div className="p-5 grow">
          {loading && <Spinner />}
          {!loading && <Outlet />}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Root;
