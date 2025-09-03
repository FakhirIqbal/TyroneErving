import { PhoneNumberValue } from '../components/common/customPhoneinput/interface';

export interface loginData {
  email: string;
  password: string;
}

export interface signupData {
  fullName: string;
  email: string;
  gender: string;
  phoneNumber: PhoneNumberValue;
  termsAccepted: boolean;
  password: string;
}
