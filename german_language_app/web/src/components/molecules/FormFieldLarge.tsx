import React from "react";
import styled from "styled-components";
import Label from "../atoms/Label";
import InputError from "../atoms/InputError";
import TextAreaInput from "../atoms/TextArea";

const FormFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

interface FormFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
}

const FormFieldLarge: React.FC<FormFieldProps> = ({label, value, onChange, error}) => {
    return (
        <FormFieldWrapper>
            <Label>{label}</Label>
            <TextAreaInput value={value} onChange={onChange} placeholder="Enter value" rows={5} />
            {error && <InputError text={error} />}
        </FormFieldWrapper>
    )
}

export default FormFieldLarge;