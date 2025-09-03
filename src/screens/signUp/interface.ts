import { PhoneNumberValue } from '../../components/common/customPhoneinput/interface';

export type SignUpFormData = {
  fullName: string;
  email: string;
  gender: string;
  phoneNumber: PhoneNumberValue;
  termsAccepted: boolean;
  password: string;
};
