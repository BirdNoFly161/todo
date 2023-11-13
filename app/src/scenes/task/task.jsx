import API from "../../../api";
import { useLoaderData } from "react-router-dom";

function Task() {
  const task = useLoaderData();
  return (
    <div>
      <h1>{task.title}</h1>
    </div>
  );
}

export async function loader({ params }) {
  let response = await API.get(`/tasks/${params.taskId}`);
  let task = response.task;
  return task;
}

export default Task;
