import { useState, useEffect } from "react";
import API from "../../../api";
import { formatDate } from "../../utils";
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
        setTasks(response.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  return (
    <div className="bg-accent w-full flex flex-col items-center gap-4 border border-primary rounded p-5">
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
      <AddTask
        open={addTaskOpen}
        setOpen={setAddTaskOpen}
        setTasks={setTasks}
      />
    </div>
  );
}

function Task({ _id, title, deadline, status }) {
  const [checked, setChecked] = useState(status === "completed" ? true : false);

  useEffect(() => {
    console.log("changed checked box to ", checked, "for task: ", _id, {
      status: checked ? "completed" : "uncompleted",
    });
    // eslint-disable-next-line no-unused-vars
    const response = API.put(`/tasks/${_id}`, {
      status: checked ? "completed" : "uncompleted",
    });
  }, [checked]);

  return (
    <div className="flex w-full justify-between bg-primary rounded">
      <span className="bg-secondary border-r border-r-accent rounded-tl rounded-bl px-4">
        <input
          className=" w-5 h-full"
          type="checkbox"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      </span>
      <span
        className={`${
          checked && "line-through"
        } grow text-sm lg:text-md flex justify-start bg-secondary px-2 py-1 whitespace-nowrap overflow-clip`}
      >
        {title}
      </span>
      <span className="hidden sm:flex">
        {deadline && (
          <span className="flex h-full bg-secondary border-l border-accent overflow-clip">
            <span className="flex items-center px-2">Due by:</span>
            <span className="flex items-center bg-white px-2">
              {formatDate(deadline)}
            </span>
          </span>
        )}
      </span>
      <span className="flex justify-center min-w-fit items-center bg-secondary px-2 rounded-tr rounded-br border-l border-accent">
        More details
      </span>
    </div>
  );
}

export default Tasks;
