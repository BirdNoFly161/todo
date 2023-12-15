import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Spinner from "../../components/spinner";
import API from "../../../api";
import { BiPlusCircle } from "react-icons/bi";

function AddTask({ setTasks }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const selectedFolder = useSelector((state) => state.folder.selectedFolder);
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="font-medium text-xl flex justify-center items-center gap-3 p-2 min-w-[5em] bg-primary border border-border rounded hover:scale-110 transition-all"
        onClick={() => setOpen(true)}
      >
        <span>New task</span>
        <BiPlusCircle />
      </button>

      <Dialog
        as="div"
        className="fixed inset-0 flex justify-center items-center"
        open={open}
        onClose={() => setOpen(true)}
      >
        <Formik
          initialValues={{
            title: "",
            deadline: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("title is required"),
            endDate: Yup.date(),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            values = {
              ...values,
              people: [currentUser._id],
              folder: selectedFolder,
            };
            let response = await API.post("/tasks", { task: values });
            setSubmitting(false);
            if (response.status === 200) {
              let response = await API.post("/tasks/search", {
                user: currentUser,
                folder: selectedFolder,
              });
              setTasks(response.tasks);
              setOpen(false);
            }
            console.log(response);
          }}
        >
          {(formik) => (
            <form
              className="w-fit h-fit p-5 flex flex-col justify-center items-center gap-10 bg-background border-2 border-border rounded p-4"
              onSubmit={formik.handleSubmit}
            >
              <h2 className="font-medium w-2/3 flex justify-center items-center text-xl sm:text-3xl">
                Add a task
              </h2>
              <div className="flex flex-col w-full justify-center gap-3">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col justify-center">
                    {" "}
                    <div className="flex items-center">
                      {" "}
                      <label
                        className="min-w-[5em] sm:min-w-[9em] bg-accent bg-opacity-70 rounded-tl rounded-bl px-2 py-1"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        className="px-2 py-1 w-full rounded-tr rounded-br"
                        type="text"
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    {" "}
                    <div className="flex items-stretch">
                      {" "}
                      <label
                        className="min-w-[5em] sm:min-w-[9em] bg-accent bg-opacity-70 rounded-tl rounded-bl px-2 py-1"
                        htmlFor="deadline"
                      >
                        <span>{"Due by"}</span>
                        <span className="hidden sm:inline">
                          {" (Optional)"}
                        </span>
                      </label>
                      <input
                        className="px-2 grow rounded-tr rounded-br"
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={formik.values.deadline}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-3">
                  <button
                    className="flex justify-center bg-accent bg-opacity-70 hover:scale-110 hover:text-white transition-all rounded px-2 py-1"
                    type="submit"
                  >
                    {formik.isSubmitting ? <Spinner /> : <span>Add task</span>}
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
    </>
  );
}

export default AddTask;
