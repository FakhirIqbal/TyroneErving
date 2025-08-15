
export interface CustomPhoneInputProp {
    label: string;
    value: string;
    onChange: (text: string) => void;
    error?: string;
}