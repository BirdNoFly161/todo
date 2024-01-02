import { useContext } from "react";
import { TaskListContext } from "../../contexts/taskListContext";
import TaskCard from "./taskCard";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import API from "../../../api";
import { cn } from "../../utils/cn";

export default function TaskList({ name, color }) {
  const { taskList, setTaskList, from, setFrom, clickedTask } =
    useContext(TaskListContext);
  const currentUser = useSelector((state) => state.user.currentUser);
  const selectedFolder = useSelector((state) => state.folder.selectedFolder);

  const bgColor =
    color === "red"
      ? "bg-red-100"
      : color === "blue"
      ? "bg-blue-100"
      : "bg-green-100";
  const borderColor =
    color === "red"
      ? "border--100"
      : color === "blue"
      ? "border-e-100"
      : "border-en-100";
  const textColor = `text-${color}-400`;
  // stop and lesting to
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "Card",
      drop: async () => {
        console.log("trying to update on drop: ", clickedTask);
        let response = await API.put(`/tasks/${clickedTask._id}`, {
          status: name,
        });
        if (response.status === 200) {
          get_tasks(currentUser, selectedFolder, setTaskList);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [clickedTask],
  );

  return (
    <div
      ref={drop}
      className={cn(
        "flex flex-col gap-1 border-2 rounded-3xl px-6 py-4 flex-1",
        {
          "bg-red-100 border-red-700": color === "red",
          "bg-blue-100 border-blue-700": color === "blue",
          "bg-green-100 border-green-700": color === "green",
        },
      )}
      onMouseDown={() => setFrom(name)}
    >
      <h1
        className={cn("py-2 font-bold text-4xl mb-4", {
          "text-red-400": color === "red",
          "text-blue-400": color === "blue",
          "text-green-400": color === "green",
        })}
      >
        {name}
      </h1>
      {taskList
        .filter((task) => task.status === name)
        .map((task) => (
          <TaskCard key={task.title} task={task} />
        ))}
    </div>
  );
}

const get_tasks = async function (currentUser, selectedFolder, setTaskList) {
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
};
