import styled from "styled-components";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import InputError from "../atoms/InputError";
import { FC } from "react";

const FormFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

interface FormFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const FormField: FC<FormFieldProps> = ({label, value, onChange, error}) => {
    return (
        <FormFieldWrapper>
            <Label>{label}</Label>
            <Input value={value} onChange={onChange} placeholder="Enter value" />
            {error && <InputError text={error} />}
        </FormFieldWrapper>
    )
}

export default FormField;