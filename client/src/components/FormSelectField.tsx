import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { JobTypes, StatusTypes } from "../context/appContext";

interface FormSelectFieldProps {
    label: string;
    name: string;
    options: string[] | JobTypes | StatusTypes,
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

  select {
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

const FormSelectField: React.FC<FormSelectFieldProps> = ({
    label,
    name,
    options,
}) => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();
    return (
        <FormInputWrapper>
            <label htmlFor={name}>{label}</label>
            <select
                {...register(`${name}` as const)}
                onChange={(e) => setValue(`${name}` as const, e.target.value, { shouldValidate: true })}
            >   
                {(options as string[]).map((opt) => {
                    return (
                        <option key={opt} value={opt}>{opt}</option>
                    )
                })}
            </select>
            <p className="error-message">
                {!!errors[name] && `*${errors[name].message}`}
            </p>
        </FormInputWrapper>
    );
};

export default FormSelectField;
