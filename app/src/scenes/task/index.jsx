import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../../api";
import { formatDate } from "../../utils";
import { useSelector } from "react-redux";
import { BiPlusCircle, BiTrash } from "react-icons/bi";
import Checkmark from "../../components/svg/checkmark";
import AddTask from "./addTask";
import Spinner from "../../components/spinner";

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
    <div className="bg-background w-full flex flex-col items-center gap-8 border border-border rounded p-5">
      {!currentUser ? (
        <span>You need to login to view your tasks</span>
      ) : (
        <>
          {" "}
          <span className="self-start font-bold text-2xl bg-background border-border py-1 rounded">
            {" "}
            My tasks
          </span>
          <div className="w-full flex flex-col gap-2">
            {tasks.map((task, index) => (
              <Task key={index} {...task} setTasks={setTasks} />
            ))}
          </div>
          <button
            className="text-lg flex justify-center items-center gap-3 p-2 min-w-[5em] bg-primary border border-border rounded hover:scale-110 transition-all"
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
        </>
      )}
    </div>
  );
}

function Task({ _id, title, deadline, status, setTasks }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [checked, setChecked] = useState(status === "completed" ? true : false);
  const [submittingDelete, setSubmittingDelete] = useState(false);

  useEffect(() => {
    const updateTaskStatus = async () => {
      console.log("changed checked box to ", checked, "for task: ", _id, {
        status: checked ? "completed" : "uncompleted",
      });
      // eslint-disable-next-line no-unused-vars
      const response = await API.put(`/tasks/${_id}`, {
        status: checked ? "completed" : "uncompleted",
      });
    };
    updateTaskStatus();
  }, [checked]);

  return (
    <div className="flex w-full justify-between border border-border rounded">
      <span
        className="flex justify-center items-center border-r border-r-border rounded-tl rounded-bl px-2 py-1"
        onClick={() => {
          setChecked(!checked);
        }}
      >
        <Checkmark checked={checked} />
      </span>
      <span className="border-r border-border">
        <button
          className="flex justify-center items-center w-10 h-full"
          onClick={async () => {
            setSubmittingDelete(true);
            const response = await API.delete(`/tasks/${_id}`);
            if (response.status === 200) {
              let response = await API.post("/tasks/search", {
                user: currentUser,
              });
              setTasks(response.tasks);
              setSubmittingDelete(false);
            }
            setSubmittingDelete(false);
          }}
        >
          <span className="w-7 h-7">
            {submittingDelete ? (
              <Spinner className={"w-full h-full"} />
            ) : (
              <span className="w-full h-full flex justify-center items-center">
                <BiTrash className=" w-[2em] h-[2em] text-red-500 hover:text-red-700" />
              </span>
            )}
          </span>
        </button>
      </span>

      <span
        className={`${
          checked && "line-through"
        } grow text-sm lg:text-lg flex justify-start items-center bg-background px-2 py-1 whitespace-nowrap overflow-clip`}
      >
        {title}
      </span>
      <span className="hidden sm:flex">
        {deadline && (
          <span className="flex h-full bg-accent bg-opacity-50 border-l border-border overflow-clip">
            <span className="flex items-center px-2">Deadline:</span>
            <span className="flex items-center px-2">
              {formatDate(deadline)}
            </span>
          </span>
        )}
      </span>
      <span className="flex justify-center min-w-fit items-center bg-accent bg-opacity-50 px-2 rounded-tr rounded-br border-l border-border hover:text-primary">
        <Link to={`/tasks/${_id}`}>
          <span> More details</span>
        </Link>
      </span>
    </div>
  );
}

export default Tasks;
