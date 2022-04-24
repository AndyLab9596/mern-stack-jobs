import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Alert from "../components/Alert";
import Form from "../components/Form";
import FormInputField from "../components/FormInputField";
import Logo from "../components/Logo";
import { useAppContext } from "../context/appContext";
import AuthWrapper from "../styles/Auth.style";

interface FormValueType {
  name: string;
  email: string;
  password: string;
  isMember: boolean;
}

const Register = () => {
  const { showAlert, registerUser, isLoading, user } = useAppContext();
  const navigate = useNavigate();
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
    const { name, email, password } = values;
    if (isMember) {
    } else {
      registerUser({ name, email, password });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 300)
    }
  }, [user, navigate])

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
        {showAlert && <Alert />}
        {!isMember && <FormInputField type="text" label="Name" name="name" />}
        <FormInputField type="email" label="Email" name="email" />
        <FormInputField type="password" label="Password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p className="footer">
          {isMember ? `Not a member yet?${" "}` : `Already a member?${" "}`}
          <button
            type="button"
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
