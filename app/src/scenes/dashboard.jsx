import { useSelector } from "react-redux";
import { FaUserCircle, FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import API from "../../api";

function Dashboard() {
  const user = useSelector((state) => state.user.currentUser);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const init = async function () {
      try {
        if (!user) {
          return;
        }
        console.log("sending tasks/search with current user: ", user);
        let response = await API.post("/tasks/search", {
          user: user,
        });
        setTasks(response.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  return (
    <div className="h-5/6 w-5/6 border border-border rounded py-5">
      {user && (
        <>
          <div className="">
            <div className="flex justify-between items-center border-b border-border px-5">
              <h1 className="font-medium text-3xl">Dashboard</h1>
              <span>
                {" "}
                <span className="py-1">Logged in as: </span>
                <div className="flex items-center gap-3 py-3 ">
                  <span className="text-lg flex flex-col justify-center bg-background text-center w-10 h-10 rounded-full">
                    {user.image && (
                      <img className="rounded-full" src={user.image} alt="" />
                    )}
                    {!user.image && (
                      <FaUserCircle className="text-gray-500 bg-white rounded-full w-full h-full" />
                    )}
                  </span>
                  <h1>{user.username}</h1>
                  <button className="px-2 py-1 flex items-center gap-2 rounded bg-accent bg-opacity-80 hover:bg-opacity-100 hover:text-white transition-all">
                    {"Edit your account "}
                    <FaRegEdit />
                  </button>
                </div>
              </span>
            </div>
          </div>

          <div className="p-3">
            <div>You have {tasks.length} tasks</div>
            <div>
              You have completed{" "}
              {tasks.filter((task) => task.status === "completed").length}/{" "}
              {tasks.length} tasks
            </div>
          </div>
        </>
      )}

      {!user && (
        <>
          <div className="bg-background w-full flex flex-col items-center gap-8 border border-border rounded p-5">
            <span>You need to login to view your tasks</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
