import { useFormik, validateYupSchema } from "formik";

function Signup() {
  return (
    <div>
      <h2>Signup</h2>
      <SignupForm />
    </div>
  );
}

function SignupForm() {
  const validate = (values)=>{
    const errors = {};
    if(!values.firstName){
      errors.firstName='Required';
    }
    
    if(!values.lastName){
      errors.lastName='Required';
    }

    if(!values.email){
      errors.email='Required';
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email= 'Invalid email';
    }

    if(!values.password){
      errors.password = 'Required';
    }else if(!/(?=.*[A-Z])/.test(values.password)){
      errors.password = 'Must contain uppercase letters'
    }
    else if(!/(?=.*[a-z])/.test(values.password)){
      errors.password = 'Must contain lowercase letters'
    }
    else if(!/(?=.*\d)/.test(values.password)){
      errors.password = 'Must contain digits'
    }
    else if(!/(?=.*[-_~!@#$%^&+])/.test(values.password)){
      errors.password = 'Must contain symbols'
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
      />
      {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
      />
      {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

      <label htmlFor="email">e-mail</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      {formik.errors.password ? <div>{formik.errors.password}</div> : null}

      <button type="submit">Sign up</button>
    </form>
  );
}

export default Signup;
