import React from "react";
import styled from "styled-components";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import InputError from "../atoms/InputError";

const FormFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    margin: 0.5rem;
`;

interface FormFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const FormField: React.FC<FormFieldProps> = ({label, value, onChange, error}) => {
    return (
        <FormFieldWrapper>
            <Label>{label}</Label>
            <Input value={value} onChange={onChange} placeholder="Enter value" />
            {error && <InputError text={error} />}
        </FormFieldWrapper>
    )
}

export default FormField;