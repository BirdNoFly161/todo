import { useState, useEffect } from "react";
import API from "../../../api";
import { useSelector } from "react-redux";
import {BiPlusCircle} from 'react-icons/bi'
import AddTask from "./addTask";

function Tasks() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [addTaskOpen, setAddTaskOpen] = useState(false)
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
    <div className="flex flex-col items-center gap-4">
      <h1>Tasks</h1>
      {tasks.map((task, index) => (
        <Task key={index} title={task.title} />
      ))}
      <button
        className="text-lg flex justify-center items-center gap-3 p-2 min-w-[5em] bg-secondary rounded hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent"
        onClick={()=>setAddTaskOpen(true)}
      >
        <span>New task</span>
        <BiPlusCircle/>
      </button>
      <AddTask open={addTaskOpen} setOpen={setAddTaskOpen}/>
    </div>
  );
}

function Task({ title }) {
  return (
    <div className="flex justify-between bg-secondary rounded">{title}</div>
  );
}

export default Tasks;
