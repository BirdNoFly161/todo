import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Spinner from "../../components/spinner";
import API from "../../../api";
import { IoMdCheckmark } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";

function AddPerson({ open, setOpen, task, setTask }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <Dialog
      as="div"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      open={open}
      onClose={() => setOpen(true)}
    >
      <Formik
        initialValues={{
          user: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("user is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          values = { ...values, people: [currentUser._id] };
        }}
      >
        {(formik) => (
          <form
            className="w-fit h-fit p-5 flex flex-col justify-center items-center gap-10 bg-background border-2 border-border rounded p-4"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="text-md sm:text-3xl w-2/3 flex justify-center items-center sm:text-3xl rounded px-2 py-1">
              Add a person
            </h2>
            <div className="flex flex-col w-full justify-center items-center gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col justify-center">
                  {" "}
                  <div className="flex items-center">
                    {" "}
                    <label
                      className="min-w-[5em] sm:min-w-[9em] bg-accent bg-opacity-70 rounded-tl rounded-bl px-2 py-1"
                      htmlFor="title"
                    >
                      Username
                    </label>
                    <SearchBar
                      task={task}
                      selectedUser={selectedUser}
                      setSelectedUser={setSelectedUser}
                    />
                  </div>
                </div>
              </div>

              <div></div>

              <div className="flex justify-center items-center gap-3">
                <button
                  className="flex justify-center bg-accent bg-opacity-70 hover:scale-110 hover:text-white transition-all rounded px-2 py-1"
                  type="submit"
                  onClick={async () => {
                    let response = await API.put(`/tasks/${task._id}`, {
                      people: task.people.concat([selectedUser._id]),
                    });
                    console.log("sent request to add person with body: ", {
                      people: task.people.concat([selectedUser._id]),
                    });
                    if (response.status === 200) {
                      console.log(
                        "returned task from people update: ",
                        response.task,
                      );
                      setTask(response.task);
                      setOpen(false);
                    }
                  }}
                >
                  {formik.isSubmitting ? <Spinner /> : <span>Add user</span>}
                </button>
                <button
                  className="flex justify-center bg-accent bg-opacity-70 hover:scale-110 hover:text-white transition-all rounded px-2 py-1"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

function SearchBar({ task, selectedUser, setSelectedUser }) {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  console.log("task passed to search bar: ", task);
  useEffect(() => {
    async function init() {
      let response = await API.post("/users/search", { keyword: keyword });
      if (response.status === 200) {
        setUsers(response.users);
        console.log("search results: ", response.users);
      }
    }

    init();
  }, [keyword]);

  return (
    <div className="relative grow">
      <span className="flex">
        <input
          className="px-2 py-1 w-full"
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onFocus={() => setSuggestionsOpen(true)}
          onBlur={() => {
            if (!suggestionsOpen) {
              setSuggestionsOpen(false);
            }
          }}
        ></input>
        <button
          className={`bg-white p-2 rounded-tr rounded-br text-red-500 hover:bg-red-500 hover:text-white ${
            !suggestionsOpen && "hidden"
          }`}
          onClick={() => setSuggestionsOpen(false)}
        >
          <TfiClose />
        </button>
      </span>

      <span
        className={`${
          !suggestionsOpen && "hidden"
        } w-full absolute flex flex-col items-center justify-center bg-background border border-border rounded-bl rounded-br`}
      >
        {selectedUser && (
          <span
            onClick={() => setSuggestionsOpen(false)}
            className="flex justify-center items-center gap-4 w-full spy-2 hover:bg-accent hover:text-white ${index!==users.length-1 && 'border-b'} border-border ${(index===users.length-1) && 'rounded-bl rounded-br'}"
          >
            {selectedUser.username}
            <IoMdCheckmark />
          </span>
        )}
        {selectedUser
          ? users
              .filter(
                (user) =>
                  !task.people.map((person) => person._id).includes(user._id),
              )
              .filter((user) => user.username !== selectedUser.username)
              .map((user, index) => (
                <span
                  onClick={() => {
                    setSelectedUser(user);
                    setSuggestionsOpen(false);
                    setKeyword(user.username);
                  }}
                  className={` flex justify-center items-center w-full spy-2 hover:bg-accent hover:text-white ${
                    index !== users.length - 1 && "border-b"
                  } border-border ${
                    index === users.length - 1 && "rounded-bl rounded-br"
                  }`}
                  key={index}
                >
                  {user.username}
                </span>
              ))
          : users
              .filter(
                (user) =>
                  !task.people.map((person) => person._id).includes(user._id),
              )
              .map((user, index) => (
                <span
                  onClick={() => {
                    setSelectedUser(user);
                    setSuggestionsOpen(false);
                    setKeyword(user.username);
                  }}
                  className={` flex justify-center items-center w-full spy-2 hover:bg-accent hover:text-white ${
                    index !== users.length - 1 && "border-b"
                  } border-border ${
                    index === users.length - 1 && "rounded-bl rounded-br"
                  }`}
                  key={index}
                >
                  {user.username}
                </span>
              ))}
      </span>
    </div>
  );
}

export default AddPerson;
