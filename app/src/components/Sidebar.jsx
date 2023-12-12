import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import API from "../../api";
import Spinner from "./spinner";
import { BiPlusCircle } from "react-icons/bi";
import { useSelector } from "react-redux";

function Sidebar({ loading }) {
  const user = useSelector((state) => state.user.currentUser);
  console.log("current User: ", user);

  return (
    <div className="h-full bg-background py-2 px-2 w-40 border-r border-border">
      <h1 className="font-medium text-2xl">Folders</h1>
      <div className="flex flex-col">
        {!loading &&
          user.folders.map((folder, index) => (
            <Folder title={folder} key={index} />
          ))}
      </div>
      <AddFolder />
    </div>
  );
}

function Folder({ title }) {
  return <span className="pl-2">{title}</span>;
}

function AddFolder() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="ml-2 font-medium text-md flex justify-center items-center gap-1 px-1 bg-primary border border-border rounded hover:scale-110 transition-all"
        onClick={() => setOpen(true)}
      >
        <span>Add</span>
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
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("title is required"),
            endDate: Yup.date(),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            values = { ...values };
            let response = await API.post("/tasks/folder", values);
            setSubmitting(false);
            if (response.status === 200) {
              setOpen(false);
              //TODO set selected folder to newly created folder here
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
                New Folder
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

                <div className="flex justify-center items-center gap-3">
                  <button
                    className="flex justify-center bg-accent bg-opacity-70 hover:scale-110 hover:text-white transition-all rounded px-2 py-1"
                    type="submit"
                  >
                    {formik.isSubmitting ? (
                      <Spinner />
                    ) : (
                      <span>Add Folder</span>
                    )}
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

export default Sidebar;
