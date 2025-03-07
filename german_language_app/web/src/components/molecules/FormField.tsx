import React from "react";
import styled from "styled-components";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const FormFieldWrapper = styled.div`
    display: flex;
`;

interface FormFieldProps {
    label: string;
}

const FormField: React.FC<FormFieldProps> = ({label}) => {
    return (
        <FormFieldWrapper>
            <Label>{label}</Label>
            <Input value="" onChange={() => {}} placeholder="Enter value" />
            <Button label="Submit" onClick={() => {}} />
        </FormFieldWrapper>
    )
}

export default FormField;