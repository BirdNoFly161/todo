import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Spinner from "../../components/spinner";
import API from "../../../api";

function AddTask() {
    const [open, setOpen] = useState(true);

    return (
        <Dialog as="div" className="w-screen h-96 flex justify-center" open={open} onClose={() => setOpen(true)}>
            <Formik
                initialValues={{
                    title: "",
                    endDate: "",
                }}
                validationSchema={Yup.object({
                    title: Yup.string().required("title is required"),
                    //endDate: Yup.string().required("Password is required"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    let response = await API.post("/tasks", values);
                    response = await response.json();
                    setSubmitting(false);
                    console.log(response);
                }}
            >
                {(formik) => (
                    <form
                        className="w-fit flex flex-col items-center gap-1 bg-primary rounded-bl rounded-br p-4"
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
                                        className="px-2 py-1 rounded-tr rounded-br"
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

                        <button
                            className="flex justify-center bg-secondary hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent rounded px-2 py-1"
                            type="submit"
                        >
                            {formik.isSubmitting ? (
                                <Spinner />
                            ) : (
                                <span>Sign in</span>
                            )}
                        </button>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
}

export default AddTask;
