import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import API from "../../api";
import Spinner from "./spinner";
import { BiPlusCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { IoCheckmark } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { TiFolderOpen } from "react-icons/ti";
import { setUser } from "../redux/user/userSlice";
import { setSelectedFolder } from "../redux/user/folderSlice";
import { cn } from "../utils/cn";

function Sidebar({ loading }) {
  const user = useSelector((state) => state.user.currentUser);
  const selectedFolder = useSelector((state) => state.folder.selectedFolder);
  const [foldersOpen, setFoldersOpen] = useState(true);
  if (!user) return null;
  return (
    <div className="h-full bg-primary-100 py-6 px-4 w-72">
      <button
        className="w-full flex justify-between items-center gap-3 font-medium text-2xl py-1 px-2 rounded hover:bg-accent"
        onClick={() => setFoldersOpen((foldersOpen) => !foldersOpen)}
      >
        <span className="flex items-center gap-1">
          <TiFolderOpen />
          <span>My folders</span>
        </span>

        {
          <FaChevronDown
            className={cn("w-4 transition-all", { "rotate-180": foldersOpen })}
          />
        }
      </button>

      <div className="h-max">
        <div className={`overflow-hidden ${!foldersOpen ? "h-0" : ""}`}>
          <div className="flex flex-col">
            {!loading &&
              user &&
              user.folders.map((folder, index) => (
                <Folder
                  title={folder}
                  key={index}
                  isActive={selectedFolder === folder}
                />
              ))}
          </div>
          <AddFolder user={user} />
        </div>
      </div>
    </div>
  );
}

function Folder({ title, isActive }) {
  const dispatch = useDispatch();
  return (
    <span
      className="flex justify-between items-center px-2 cursor-pointer rounded hover:bg-accent hover:bg-opacity-40 transition-all"
      onClick={() => dispatch(setSelectedFolder(title))}
    >
      <span className="pl-2">{title}</span>
      {isActive && <IoCheckmark />}
    </span>
  );
}

function AddFolder({ user }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <button
        className="ml-2 mt-2 font-medium text-md flex justify-center items-center gap-1 px-2 py-1 bg-primary text-white border border-border rounded-full hover:bg-background hover:text-primary hover:border hover:border-primary transition-all"
        onClick={() => setOpen(true)}
      >
        <span>New</span>
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
            let response = await API.put(`/users/${user._id}`, {
              folders: [...user.folders, values.title],
            });
            setSubmitting(false);
            if (response.status === 200) {
              dispatch(setUser(response.user));
              setOpen(false);
              //TODO set selected folder to newly created folder here
            }
            console.log(response);
          }}
        >
          {(formik) => (
            <form
              className="w-fit h-fit p-5 flex flex-col justify-center items-center gap-10 bg-background border-2 border-border rounded"
              onSubmit={formik.handleSubmit}
            >
              <h2 className="font-medium w-2/3 flex justify-center items-center text-xl sm:text-3xl">
                New Folder
              </h2>
              <div className="flex flex-col w-full justify-center gap-3">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center">
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
