export interface PhoneNumberValue {
  formatted_number: string;
  national_number: string;
  country_code: string;
  is_valid: boolean;
}
export interface CustomPhoneInputProp {
  label?: string;
  value?: PhoneNumberValue;
  onChange: (value: PhoneNumberValue) => void;
  error?: string;
  disabled?: boolean;
}
