import React from 'react';
import { COLORS } from '../../utils/theme';
import { SignInFormData } from './interface';
import { useForm, Controller } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  Platform,
  Keyboard,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import AuthHeader from '../../components/authHeader';
import CustomInput from '../../components/common/customInput';
import CustomButton from '../../components/common/customButton';
import CustomCheckbox from '../../components/common/customCheckbox';
import WrapperContainer from '../../components/common/customWrapper';
import useAuth from '../../services/AuthService';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const SignIn = ({ navigation }: any) => {
  const userData = useSelector((state: RootState) => state.userData);
  console.log('User ', userData);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
  const { userLogin, isloading } = useAuth();
  const onSubmit = (data: SignInFormData) => {
    console.log('Form Data:', data);
    userLogin(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
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
            <AuthHeader title="Let's get started!" />

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

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Controller
                control={control}
                name="rememberMe"
                render={({ field: { value, onChange } }) => (
                  <CustomCheckbox
                    label="Remember Me"
                    value={value}
                    onChange={onChange}
                    error={errors.rememberMe?.message}
                  />
                )}
              />
              <Text
                style={{
                  fontSize: RFValue(12),
                  color: COLORS.orange,
                  marginTop: hp(1),
                }}
                onPress={() => navigation.navigate('ForgetPass')}
              >
                Forgot Password?
              </Text>
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: 'flex-end', marginBottom: hp(4) }}
          >
            <Text style={styles.accText}>
              {' '}
              Don't Have Account{' '}
              <Text
                style={{ color: COLORS.orange }}
                onPress={() => navigation.goBack()}
              >
                {' '}
                SignUp Now!{' '}
              </Text>{' '}
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

export default SignIn;

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
