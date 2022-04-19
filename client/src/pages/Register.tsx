import React, { useState } from "react";
import AuthWrapper from "../styles/Auth.style";
import * as yup from "yup";
import Form from "../components/Form";
import Logo from "../components/Logo";
import FormInputField from "../components/FormInputField";

interface FormValueType {
  name: string;
  email: string;
  password: string;
  isMember: boolean;
}

const Register = () => {
  const [isMember, setIsMember] = useState<boolean>(true);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    isMember: isMember,
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .nullable(true)
      .when(["isMember"], {
        is: false,
        then: yup.string().required("Please provide name"),
      }),
    email: yup
      .string()
      .email("Please provide proper email")
      .required("Email must be provided"),
    password: yup.string().required("Password must be provided"),
  });

  const handleSubmit = (values: FormValueType) => {
    console.log(values);
  };

  return (
    <AuthWrapper>
      <Form
        defaultValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        className="form"
      >
        <Logo />
        <h3>{isMember ? "Login" : "Register"}</h3>
        {!isMember && <FormInputField type="text" label="Name" name="name" />}
        <FormInputField type="email" label="Email" name="email" />
        <FormInputField type="password" label="Password" name="password" />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p className="footer">
          {isMember ? `Not a member yet?${" "}` : `Already a member?${" "}`}
          <button
            className="member-btn"
            onClick={() => setIsMember((prevState) => !prevState)}
          >
            {isMember ? "Register" : "Login"}
          </button>
        </p>
      </Form>
    </AuthWrapper>
  );
};

export default Register;
