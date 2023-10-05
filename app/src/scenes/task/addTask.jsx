import { Dialog } from "@headlessui/react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Spinner from "../../components/spinner";
import API from "../../../api";

function AddTask({ open, setOpen }) {
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <Dialog
            as="div"
            className="fixed inset-0 flex justify-center items-center"
            open={open}
            onClose={() => setOpen(true)}
        >
            <Formik
                initialValues={{
                    title: "",
                    //deadline: "",
                }}
                validationSchema={Yup.object({
                    title: Yup.string().required("title is required"),
                    //endDate: Yup.string().required("Password is required"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    values = { ...values, people: [currentUser._id] };
                    let response = await API.post("/tasks", { task: values });
                    response = await response.json();
                    setSubmitting(false);
                    console.log(response);
                }}
            >
                {(formik) => (
                    <form
                        className="w-1/3 h-1/3 flex flex-col items-center gap-1 bg-primary rounded p-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex flex-col">
                                {" "}
                                <div className="flex items-center">
                                    {" "}
                                    <label
                                        className="min-w-[6em] bg-secondary rounded-tl rounded-bl px-2 py-1"
                                        htmlFor="title"
                                    >
                                        Title
                                    </label>
                                    <input
                                        className="px-2 py-1 grow rounded-tr rounded-br"
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
                                className="flex justify-center bg-secondary hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent rounded px-2 py-1"
                                type="submit"
                            >
                                {formik.isSubmitting ? (
                                    <Spinner />
                                ) : (
                                    <span>Add task</span>
                                )}
                            </button>
                            <button
                                className="flex justify-center bg-secondary hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent rounded px-2 py-1"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
}

export default AddTask;
