import { useState, useEffect } from "react";
import API from "../../../api";
import { useSelector } from "react-redux";
import { BiPlusCircle } from "react-icons/bi";
import AddTask from "./addTask";

function Tasks() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const init = async function () {
      try {
        if (!currentUser) {
          return;
        }
        console.log("sending tasks/search with current user: ", currentUser);
        let response = await API.post("/tasks/search", {
          user: currentUser,
        });
        response = await response.json();
        setTasks(response.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  return (
    <div className="bg-accent flex flex-col items-center gap-4 border border-primary rounded p-5">
      <span className="bg-secondary px-4 py-1 rounded">Tasks</span>
      {tasks.map((task, index) => (
        <Task key={index} {...task} />
      ))}
      <button
        className="text-lg flex justify-center items-center gap-3 p-2 min-w-[5em] bg-secondary rounded hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent"
        onClick={() => setAddTaskOpen(true)}
      >
        <span>New task</span>
        <BiPlusCircle />
      </button>
      <AddTask open={addTaskOpen} setOpen={setAddTaskOpen} />
    </div>
  );
}

function Task({ title, deadline }) {
  return (
    <div className="flex justify-between px-4 py-2 gap-3 bg-primary rounded">
      <span className="bg-secondary px-2 py-1">{title}</span>
      <span className="flex items-stretch bg-secondary px-2 py-1">
        <span className="px-2">Due by:</span>
        <span className="bg-white px-2">{deadline}</span>
      </span>
    </div>
  );
}

export default Tasks;
