import { TextInputProps } from "react-native";

type InputType = 'text' | 'email' | 'password';

export interface CustomInputProps extends TextInputProps {
    type?: InputType;
    label?: string;
    error?: string;
}