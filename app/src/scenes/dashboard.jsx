import { useSelector } from "react-redux";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { useState, useEffect, Fragment } from "react";
import API from "../../api";
import { Listbox, Transition } from "@headlessui/react";
import { Progress } from "@/components/ui/progress";

function Dashboard() {
  const user = useSelector((state) => state.user.currentUser);
  const [tasks, setTasks] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(user.folders[0]);

  useEffect(() => {
    const init = async function () {
      try {
        if (!user) {
          return;
        }
        let response = await API.post("/tasks/search", {
          user: user,
          folder: selectedFolder,
        });
        setTasks(response.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, [selectedFolder]);

  return (
    <div className="w-full h-full rounded">
      {user && (
        <>
          <div className="">
            <div className="flex justify-between items-center border-b border-border">
              <h1 className="font-bold text-4xl">Dashboard</h1>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-3">
            <div className="flex gap-2 items-center">
              <span>You have {user.folders.length} folders: </span>{" "}
              <FolderListBox
                folders={user.folders}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
              />
            </div>

            <div>You have {tasks.length} tasks</div>
            <div>
              Tasks completed
              <Progress
                value={
                  (tasks.filter((task) => task.status === "Completed").length /
                    tasks.length) *
                  100
                }
                className="w-1/3"
              />
            </div>
            <div>
              Tasks in progress
              <Progress
                value={
                  (tasks.filter((task) => task.status === "In progress")
                    .length /
                    tasks.length) *
                  100
                }
                className="w-1/3"
              />
            </div>
            <div>
              Tasks in Uncompleted
              <Progress
                value={
                  (tasks.filter((task) => task.status === "Uncompleted")
                    .length /
                    tasks.length) *
                  100
                }
                className="w-1/3"
              />
            </div>
          </div>
        </>
      )}

      {!user && (
        <>
          <div className="bg-background w-full flex flex-col items-center gap-8 border border-border rounded p-5">
            <span>You need to login to view your tasks</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;

const FolderListBox = ({ folders, selectedFolder, setSelectedFolder }) => {
  return (
    <div className="w-72">
      <Listbox value={selectedFolder} onChange={setSelectedFolder}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedFolder}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiMiniChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-30">
              {folders.map((folder, folderIdx) => (
                <Listbox.Option
                  key={folderIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-primary-100 text-primary" : "text-gray-900"
                    }`
                  }
                  value={folder}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {folder}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
