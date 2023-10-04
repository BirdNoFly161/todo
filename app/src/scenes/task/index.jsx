import { useState, useEffect } from "react";
import API from "../../../api";
import { useSelector } from "react-redux";

function Tasks() {
  const currentUser = useSelector((state) => state.user.user);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const init = async function () {
      try {
        if (!currentUser) {
          return;
        }
        console.log('sending tasks/search with current user: ', currentUser)
        let response = await API.post("/tasks/search", { user: currentUser });
        response = await response.json();
        setTasks(response.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  return (
      <div>
        <h1>Tasks</h1>
        {tasks.map((task, index) => (
          <Task key={index} title={task.title} />
        ))}
      </div>
  );
}

function Task({ title, done }) {
  return (
    <div className="flex justify-between bg-secondary rounded">{title}</div>
  );
}

export default Tasks;
