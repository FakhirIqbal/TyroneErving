import React from 'react';
import { COLORS } from '../../utils/theme';
import { SignUpFormData } from './interface';
import { useForm, Controller } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import AuthHeader from '../../components/authHeader';
import CustomInput from '../../components/common/customInput';
import CustomButton from '../../components/common/customButton';
import CustomDropdown from '../../components/common/customDropdown';
import CustomCheckbox from '../../components/common/customCheckbox';
import CustomPhoneInput from '../../components/common/customPhoneinput';
import { ScreenNames } from '../../navigation/ScreenName';
import WrapperContainer from '../../components/common/customWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import useAuth from '../../services/AuthService';

const SignUp = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      gender: '',
      phoneNumber: '',
      termsAccepted: false,
    },
  });
  const { userSignup, isloading } = useAuth();

  const onSubmit = async (data: SignUpFormData) => {
    userSignup(data, navigation);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <WrapperContainer>
        <ScrollView
          bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <AuthHeader title="Create Account" />

            <Controller
              control={control}
              name="fullName"
              rules={{ required: 'Name is required' }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Name:"
                  type="text"
                  placeholder="Enter your name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.fullName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Enter a valid email',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Email address:"
                  type="email"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="gender"
              rules={{ required: 'Gender is required' }}
              render={({ field: { onChange, value } }) => (
                <CustomDropdown
                  label="Gender"
                  placeholder="Select gender"
                  options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                  ]}
                  value={value}
                  onChange={onChange}
                  error={errors.gender?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              rules={{
                required: 'Phone number is required',
                minLength: { value: 10, message: 'Too short' },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomPhoneInput
                  label="Phone Number"
                  value={value}
                  onChange={onChange}
                  error={errors.phoneNumber?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="termsAccepted"
              rules={{ required: 'You must accept the terms and conditions' }}
              render={({ field: { value, onChange } }) => (
                <CustomCheckbox
                  label="I agree to the terms and conditions"
                  value={value}
                  onChange={onChange}
                  error={errors.termsAccepted?.message}
                />
              )}
            />
          </View>

          <View
            style={{ flex: 1, justifyContent: 'flex-end', marginBottom: hp(4) }}
          >
            <Text style={styles.accText}>
              Already Have Account{' '}
              <Text
                style={{ color: COLORS.orange }}
                onPress={() => navigation.navigate(ScreenNames.SIGNIN)}
              >
                SignIn Now!
              </Text>
            </Text>
            <CustomButton
              isloading={isloading}
              title="Continue"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </WrapperContainer>
    </KeyboardAvoidingView>
  );
};
export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
  },
  accText: {
    fontSize: RFValue(12),
    marginVertical: hp(2),
    textAlign: 'center',
    color: COLORS.black,
  },
});
