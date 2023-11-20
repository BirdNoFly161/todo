import API from "../../../api";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { BiPlusCircle } from "react-icons/bi";
import { TfiClose } from "react-icons/tfi";
import { formatDate } from "../../utils";
import Spinner from "../../components/spinner";
import AddPerson from "./addPerson";

function Task() {
  const [task, setTask] = useState(useLoaderData());
  const [addPersonOpen, setAddPersonOpen] = useState(false);
  console.log(task);
  return (
    <div className="w-2/3 flex flex-col justify-center items-start gap-4 border border-border rounded p-6">
      <h1 className="font-bold text-3xl">{task.title}</h1>
      {task.deadline ? (
        <span>
          <span className="font-medium text-lg">Deadline:</span>{" "}
          {formatDate(task.deadline)}
        </span>
      ) : (
        <span>No deadline specified for this task</span>
      )}
      <div className="flex flex-col people">
        <span className="font-medium text-lg">Users involved:</span>
        <div className="flex gap-1 flex-wrap">
          {task.people.map((person, index) => (
            <Person key={index} person={person} task={task} setTask={setTask} />
          ))}
        </div>
      </div>
      <button
        className="flex justify-center gap-3 min-w-fit items-center bg-green-500 px-2 py-1 border border-border hover:scale-110 transition-all rounded"
        onClick={() => setAddPersonOpen(true)}
      >
        Assign person <BiPlusCircle />
      </button>
      <AddPerson
        task={task}
        setTask={setTask}
        open={addPersonOpen}
        setOpen={setAddPersonOpen}
      />
    </div>
  );
}

function Person({ person, task, setTask }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <span className="flex border border-border rounded bg-background">
      <span className="px-1">{person.username}</span>
      <button
        className="px-1 border-l border-border text-red-500 hover:bg-red-500 hover:text-white"
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

export async function loader({ params }) {
  let response = await API.get(`/tasks/${params.taskId}`);
  let task = response.task;
  console.log(task);
  return task;
}

export default Task;
