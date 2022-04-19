import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

interface FormInputFieldProps {
  type: "text" | "email" | "password";
  label: string;
  name: string;
}

const FormInputWrapper = styled.div`
  margin-bottom: 1rem;
  label {
    display: block;
    font-size: var(--smallText);
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }

  input {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
    height: 35px;
  }
  .error-message {
    color: var(--red-dark);
    font-size: var(--small-text);
    margin-bottom: 0;
  }
`;

const FormInputField: React.FC<FormInputFieldProps> = ({
  type,
  label,
  name,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormInputWrapper>
      <label htmlFor={name}>{label}</label>
      <input {...register(`${name}` as const)} />
      <p className="error-message">
        {!!errors[name] && `*${errors[name].message}`}
      </p>
    </FormInputWrapper>
  );
};

export default FormInputField;
