import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../components/spinner";
import { BiErrorCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../redux/user/userSlice";
import { setUser } from "../redux/user/userSlice";
import { setSelectedFolder } from "../redux/user/folderSlice";
import API from "../../api";
import toast from "react-hot-toast";

function SignIn() {
  return (
    <div className="flex flex-col justify-center bg-background w-full sm:w-2/3">
      <h2 className="font-medium text-3xl p-2 min-w-[5em] bg-primary border border-border text-center rounded-tl rounded-tr">
        Sign in
      </h2>
      <SignInForm />
    </div>
  );
}

function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          username: "oussama161",
          password: "Passowrd123&&",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("User name is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          let response = await API.post("/users/login", values);
          if (response.status === 200) {
            dispatch(setAuthToken(response.token));
            API.setAuthToken(response.token);
            dispatch(setUser(response.user));
            dispatch(setSelectedFolder(response.user.folders[0]));
            setSubmitting(false);
            console.log(response);
            navigate("/");
          } else {
            toast.error(response.msg);
          }
        }}
      >
        {(formik) => (
          <form
            className="flex flex-col items-center p-10 gap-7 bg-background border-l border-r border-b border-border rounded-bl rounded-br p-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col gap-5 w-full">
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
                    className="w-full text-sm sm:text-lg px-2 py-1 rounded-tr rounded-br border border-border"
                    type="text"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <BiErrorCircle className="text-red-500" />
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
                  {formik.touched.password && formik.errors.password ? (
                    <BiErrorCircle className="text-red-500" />
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
            </div>

            <button
              className="font-medium text-xl flex justify-center w-1/3 bg-primary border border-border bg-opacity-70 hover:scale-110 hover:text-white transition-all rounded px-2 py-1"
              type="submit"
            >
              {formik.isSubmitting ? <Spinner /> : <span>Sign in</span>}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default SignIn;
