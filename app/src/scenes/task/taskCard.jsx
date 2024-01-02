import { useContext, useState } from "react";
import { TaskListContext } from "../../contexts/taskListContext";
import { useDrag } from "react-dnd";
import { BsThreeDots } from "react-icons/bs";
import { getDateDiff } from "../../utils";
import { formatDiff } from "../../utils";
import { IoWarningOutline } from "react-icons/io5";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";
import { BiPlusCircle } from "react-icons/bi";
import { Dialog } from "@headlessui/react";
import { formatDate } from "../../utils";
import AddPerson from "./addPerson";
import API from "../../../api";
import Spinner from "../../components/spinner";
import { cn } from "../../utils/cn";

export default function TaskCard({ task }) {
  const { setClickedTask } = useContext(TaskListContext);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Card",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div
        ref={drag}
        className={cn(
          "flex justify-between items-center bg-background border border-border rounded-lg p-2 hover:bg-accent transition-all",
          { "opacity-100": isDragging },
        )}
        onMouseDown={() => setClickedTask(task)}
      >
        <div>{task.title}</div>
        <span className="flex ">
          <span className="flex">
            {task.deadline && (
              <span className="flex justify-center h-full min-w-[7em] bg-opacity-50 border-border overflow-clip cursor-default">
                <span className="flex items-center px-2">
                  {getDateDiff(task.deadline) < 0 ? (
                    <span className="flex gap-1 items-center text-red-700">
                      {"Overdue"} <IoWarningOutline />
                    </span>
                  ) : (
                    `${formatDiff(
                      getDateDiff(task.deadline),
                      "days",
                    )} days left`
                  )}
                </span>
              </span>
            )}
          </span>
          <TaskDetails task={task} />
        </span>
      </div>
    </>
  );
}

function TaskDetails({ task }) {
  const [addPersonOpen, setAddPersonOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <>
      <span
        className="p-1 rounded transition-all hover:text-white"
        onClick={() => setDetailsOpen(true)}
      >
        <BsThreeDots />
      </span>
      <Dialog
        as="div"
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      >
        <div className="w-1/3 flex flex-col justify-center items-start gap-4 bg-background border border-border rounded p-6">
          <div className="flex justify-between w-full">
            <h1 className="font-bold text-3xl">{task.title}</h1>

            <button
              className="bg-primary border border-border rounded px-2 hover:scale-110 transition-all"
              onClick={() => setDetailsOpen(false)}
            >
              <IoReturnDownBackOutline className="w-[2em] h-[2em]" />
            </button>
          </div>
          {task.deadline ? (
            <span>
              <span className="font-medium text-lg">Deadline:</span>
              {formatDate(task.deadline)}
            </span>
          ) : (
            <span>No deadline specified for this task</span>
          )}
          <div className="flex flex-col people">
            <span className="font-medium text-lg">Users involved:</span>
            <div className="flex gap-1 flex-wrap">
              {task.people.map((person, index) => (
                <Person key={index} person={person} task={task} />
              ))}
            </div>
          </div>
          <div className="w-2/3 flex justify-start gap-3">
            <button
              className="font-medium text-xl flex self-start justify-center gap-3 min-w-fit items-center bg-primary px-2 py-1 border border-border hover:scale-110 transition-all rounded"
              onClick={() => setAddPersonOpen(true)}
            >
              Assign person <BiPlusCircle />
            </button>
          </div>
          <AddPerson
            task={task}
            open={addPersonOpen}
            setOpen={setAddPersonOpen}
          />
        </div>
      </Dialog>
    </>
  );
}

function Person({ person, task, setTask }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <span className="flex items-center border border-border rounded bg-background">
      <span className=" flex items-center px-2 py-1">
        <img
          className="w-7 h-7 rounded-full"
          src={person.image}
          alt="user avatar"
        />
        <span className="px-1">{person.username}</span>
      </span>

      <button
        className="h-full px-2 py-1 border-l border-border text-red-500 hover:bg-red-500 hover:text-white"
        onClick={async () => {
          setIsSubmitting(true);
          let response = await API.put(`/tasks/${task._id}`, {
            people: task.people.filter((user) => user._id != person._id),
          });
          if (response.status === 200) {
            console.log("returned task from people update: ", response.task);
            setTask(response.task);
          }
          setIsSubmitting(false);
        }}
      >
        {isSubmitting ? <Spinner className="w-[1em] h-[1em]" /> : <TfiClose />}
      </button>
    </span>
  );
}
