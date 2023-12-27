import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../../api";
import { getDateDiff, formatDiff } from "../../utils";
import { useSelector } from "react-redux";
import { BiTrash } from "react-icons/bi";
import { IoWarningOutline } from "react-icons/io5";
import { HiChevronUpDown } from "react-icons/hi2";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Checkmark from "../../components/svg/checkmark";
import AddTask from "./addTask";
import Spinner from "../../components/spinner";
import { Listbox } from "@headlessui/react";
import { taskStatuses, taskListNames } from "../../constants";
import { useContext } from "react";
import { TaskListContext } from "../../contexts/taskListContext";
import TaskList from "./taskList";

function Tasks() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const selectedFolder = useSelector((state) => state.folder.selectedFolder);
  const [taskList, setTaskList] = useState([]);
  const [clickedTask, setClickedTask] = useState(null);
  const [from, setFrom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("latest clicked task: ", clickedTask);
  }, [clickedTask]);

  useEffect(() => {
    const init = async function () {
      setLoading(true);
      try {
        if (!currentUser) {
          return;
        }

        console.log("sending tasks/search with body: ", {
          currentUser,
          selectedFolder,
        });
        let response = await API.post("/tasks/search", {
          user: currentUser,
          folder: selectedFolder,
        });
        setTaskList(response.tasks);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    init();
  }, [selectedFolder]);

  return (
    <div className="bg-background w-full h-full flex justify-center gap-8 rounded p-5">
      {!currentUser ? (
        <span className="font-bold text-3xl">
          You need to login to view your tasks
        </span>
      ) : loading ? (
        <Spinner />
      ) : (
        <TaskListContext.Provider
          value={{
            taskList,
            setTaskList,
            from,
            setFrom,
            clickedTask,
            setClickedTask,
          }}
        >
          <div className="w-full flex flex-col gap-2">
            <h2 className="font-bold text-4xl mb-5">{selectedFolder}</h2>

            <AddTask setTasks={setTaskList} />
            <div className="w-full flex gap-3 grow">
              <TaskList key={"Uncompleted"} name={"Uncompleted"} color="red" />
              <TaskList key={"In progress"} name={"In progress"} color="blue" />
              <TaskList key={"Completed"} name={"Completed"} color="green" />
            </div>
          </div>
        </TaskListContext.Provider>
      )}
    </div>
  );
}

function Task({ _id, title, deadline, status, setTasks }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [checked, setChecked] = useState(status === "Completed" ? true : false);
  const [submittingDelete, setSubmittingDelete] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);

  useEffect(() => {
    async function updateStatus() {
      let response = await API.put(`/tasks/${_id}`, { status: selectedStatus });
      if (response.status === 200) {
        if (selectedStatus === "Completed") {
          setChecked(true);
        } else {
          setChecked(false);
        }
      }
    }

    updateStatus();
  }, [selectedStatus]);

  return (
    <div className="flex w-full lg:w-2/3 justify-between border border-border rounded">
      <span
        className="flex justify-center items-center border-r border-r-border rounded-tl rounded-bl px-2 py-1"
        onClick={() => {
          setChecked(!checked);
        }}
      >
        <Checkmark checked={checked} />
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
          <span className="flex justify-center h-full min-w-[7em] bg-accent bg-opacity-50 border-l border-border overflow-clip">
            <span className="flex items-center px-2">
              {getDateDiff(deadline) < 0 ? (
                <span className="flex gap-1 items-center text-red-700">
                  {"Overdue"} <IoWarningOutline />
                </span>
              ) : (
                `${formatDiff(getDateDiff(deadline), "days")} days left`
              )}
            </span>
          </span>
        )}
      </span>

      <span className="flex justify-center min-w-[9em] border-l border-border">
        <Listbox value={selectedStatus} onChange={setSelectedStatus}>
          <div className="relative grow">
            <Listbox.Button className="flex items-center justify-between px-2 py-1 w-full h-full hover:bg-accent hover:bg-opacity-60">
              {selectedStatus}
              <HiChevronUpDown />
            </Listbox.Button>
            <Listbox.Options className="absolute w-full bg-background rounded-b border-b border-l border-r border-border z-10">
              {taskStatuses.map((status, index) => (
                <Listbox.Option
                  key={index}
                  value={status}
                  className={({ active }) =>
                    `relative px-2 py-1 block ${active && "bg-accent"}`
                  }
                >
                  {status}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </span>

      <span className="border-l border-border">
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

      <span className="flex justify-center min-w-[2.5em] items-center bg-accent bg-opacity-50 px-2 rounded-tr rounded-br border-l border-border hover:bg-opacity-100">
        <Link to={`/tasks/${_id}`}>
          <span>
            {" "}
            <BiDotsHorizontalRounded />
          </span>
        </Link>
      </span>
    </div>
  );
}

export default Tasks;
