import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Spinner from "../components/spinner";
import { BiErrorCircle } from "react-icons/bi";
import { BiCheckCircle } from "react-icons/bi";
import API from "../../api";

function Signup() {
  return (
    <div className="flex flex-col justify-center w-full sm:w-2/3">
      <h2 className="font-medium text-3xl p-2 min-w-[5em] bg-accent text-center border border-border rounded-tl rounded-tr">
        Signup
      </h2>
      <SignupForm />
    </div>
  );
}

function SignupForm() {
  return (
    <>
      <Formik
        initialValues={{
          username: "oussama161",
          firstName: "Oussama",
          lastName: "Benmansour",
          email: "oussama@gmail.com",
          password: "Passowrd123&&",
          profile: [],
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("User name is required"),
          firstName: Yup.string().required("First name is required"),
          lastName: Yup.string().required("Last name is required"),
          email: Yup.string()
            .email("Not a valid email address")
            .required("Email is required"),
          password: Yup.string()
            .required("Password is required")
            .matches(
              /(?=.*[A-Z])/,
              "Password must contain atleast one uppercase letter",
            )
            .matches(
              /(?=.*[a-z])/,
              "Password must contain atleast one lowercase letter",
            )
            .matches(/(?=.*\d)/, "Password must contain atleast one number")
            .matches(
              /(?=.*[-_~!@#$%^&+])/,
              "Password must contain atleast one symbol",
            ),
          profile: Yup.mixed(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("trying to submit sign up with values: ", values);
          let response = await API.post_multipart("/users/register", values);
          setSubmitting(false);
          if (response.status === 200) {
            toast.success("Succesfully created account");
          }
          console.log(response);
        }}
      >
        {(formik) => (
          <form
            className="flex flex-col items-center p-10 gap-7 bg-background border-l border-r border-b border-border rounded-bl rounded-br p-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col">
                {" "}
                <div className="flex items-center">
                  {" "}
                  <label
                    className="text-sm sm:text-lg min-w-[7em] bg-primary rounded-tl rounded-bl px-2 py-1"
                    htmlFor="username"
                  >
                    User name
                  </label>
                  <input
                    className="w-full text-sm sm:text-lg px-2 py-1 rounded-tr rounded-br"
                    type="text"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.username ? (
                    formik.errors.username ? (
                      <BiErrorCircle className="text-red-500" />
                    ) : (
                      <BiCheckCircle className="text-green-500" />
                    )
                  ) : (
                    <div className="w-[1em] h-[1em]" />
                  )}
                </div>
                {formik.touched.username && formik.errors.username ? (
                  <div className="bg-red-500 border-b-red-700 text-white">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                {" "}
                <div className="flex items-center">
                  {" "}
                  <label
                    className="text-sm sm:text-lg min-w-[7em] bg-primary rounded-tl rounded-bl px-2 py-1"
                    htmlFor="firstName"
                  >
                    First name
                  </label>
                  <input
                    className="w-full text-sm sm:text-lg px-2 py-1 rounded-tr rounded-br"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.firstName ? (
                    formik.errors.firstName ? (
                      <BiErrorCircle className="text-red-500" />
                    ) : (
                      <BiCheckCircle className="text-green-500" />
                    )
                  ) : (
                    <div className="w-[1em] h-[1em]" />
                  )}
                </div>
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="bg-red-500 border-b-red-700 text-white">
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                {" "}
                <div className="flex items-center">
                  {" "}
                  <label
                    className="text-sm sm:text-lg min-w-[7em] bg-primary rounded-tl rounded-bl px-2 py-1"
                    htmlFor="lastName"
                  >
                    Last name
                  </label>
                  <input
                    className="w-full text-sm sm:text-lg px-2 py-1 rounded-tr rounded-br"
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formik.values.lastName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.lastName ? (
                    formik.errors.lastName ? (
                      <BiErrorCircle className="text-red-500" />
                    ) : (
                      <BiCheckCircle className="text-green-500" />
                    )
                  ) : (
                    <div className="w-[1em] h-[1em]" />
                  )}
                </div>
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="bg-red-500 border-b-red-700 text-white">
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                {" "}
                <div className="flex items-center">
                  {" "}
                  <label
                    className="text-sm sm:text-lg min-w-[7em] bg-primary rounded-tl rounded-bl px-2 py-1"
                    htmlFor="email"
                  >
                    e-mail
                  </label>
                  <input
                    className="w-full text-sm sm:text-lg px-2 py-1 rounded-tr rounded-br"
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email ? (
                    formik.errors.email ? (
                      <BiErrorCircle className="text-red-500" />
                    ) : (
                      <BiCheckCircle className="text-green-500" />
                    )
                  ) : (
                    <div className="w-[1em] h-[1em]" />
                  )}
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="bg-red-500 border-b-red-700 text-white">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                {" "}
                <div className="flex items-center">
                  {" "}
                  <label
                    className="text-sm sm:text-lg min-w-[7em] bg-primary rounded-tl rounded-bl px-2 py-1"
                    htmlFor="password"
                  >
                    password
                  </label>
                  <input
                    className="w-full text-sm sm:text-lg px-2 py-1 rounded-tr rounded-br"
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.password ? (
                    formik.errors.password ? (
                      <BiErrorCircle className="text-red-500" />
                    ) : (
                      <BiCheckCircle className="text-green-500" />
                    )
                  ) : (
                    <div className="w-[1em] h-[1em]" />
                  )}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="bg-red-500 border-b-red-700 text-white">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                {" "}
                <div className="flex items-stretch">
                  {" "}
                  <label
                    className="text-sm sm:text-lg max-w-[7em] sm:min-w-[15em] bg-primary rounded-tl rounded-bl px-2 py-1"
                    htmlFor="profile"
                  >
                    {"Profile picture (Optional)"}
                  </label>
                  <input
                    className="w-full text-sm sm:text-lg px-2 py-1 rounded-tr rounded-br bg-white"
                    type="file"
                    id="profile"
                    name="profile"
                    onChange={(e) =>
                      formik.setFieldValue("profile", e.target.files[0])
                    }
                  />
                </div>
              </div>
            </div>

            <button
              className="font-medium text-2xl flex justify-center w-1/3 bg-primary border border-border bg-opacity-70 hover:scale-110 hover:text-white transition-all rounded px-2 py-1"
              type="submit"
            >
              {formik.isSubmitting ? <Spinner /> : <span>Sign up</span>}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Signup;
