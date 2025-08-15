
export interface CustomCheckboxProps {
    label: string;
    value: boolean;
    onChange: (newValue: boolean) => void;
    error?: string;
}