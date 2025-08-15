import { ViewStyle, StyleProp } from "react-native";

type Option = {
    label: string;
    value: string;
};

export interface CustomDropdownProps {
    label: string;
    placeholder: string;
    options: Option[];
    value: string | null;
    onChange: (value: string) => void;
    error?: string;
      style?: StyleProp<ViewStyle>;
}