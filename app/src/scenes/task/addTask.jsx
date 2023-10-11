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
                    deadline: "",
                }}
                validationSchema={Yup.object({
                    title: Yup.string().required("title is required"),
                    endDate: Yup.date(),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    values = { ...values, people: [currentUser._id] };
                    console.log("trying to add task with values: ", values);
                    let response = await API.post("/tasks", { task: values });
                    response = await response.json();
                    setSubmitting(false);
                    console.log(response);
                }}
            >
                {(formik) => (
                    <form
                        className="w-2/3 flex flex-col justify-between items-center gap-1 bg-primary rounded p-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <h2 className="w-2/3 flex justify-center items-center text-xl sm:text-3xl bg-secondary rounded px-2 py-1">
                            Add a task
                        </h2>
                        <div className="flex flex-col w-full justify-center gap-3">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col justify-center">
                                    {" "}
                                    <div className="flex items-center">
                                        {" "}
                                        <label
                                            className="min-w-[5em] sm:min-w-[9em] bg-secondary rounded-tl rounded-bl px-2 py-1"
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
                                            className="min-w-[5em] sm:min-w-[9em] bg-secondary rounded-tl rounded-bl px-2 py-1"
                                            htmlFor="deadline"
                                        >
                                            <span>{"Due by"}</span><span className="hidden sm:inline">{" (Optional)"}</span>
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
                        </div>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
}

export default AddTask;
