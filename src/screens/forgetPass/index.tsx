import React from 'react';
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import WrapperContainer from '../../components/common/customWrapper';
import AuthHeader from '../../components/authHeader';
import CustomInput from '../../components/common/customInput';
import CustomButton from '../../components/common/customButton';
import useAuth from '../../services/AuthService';

type ForgetPassFormData = {
  email: string;
};

const ForgetPass = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPassFormData>({
    defaultValues: {
      email: '',
    },
  });
  const { forgotPass, isloading } = useAuth();
  const onSubmit = (data: ForgetPassFormData) => {
    forgotPass(data.email);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <WrapperContainer>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <AuthHeader title="Just One Step Away" />

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter a valid email address',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Email address"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                />
              )}
            />
          </View>

          <CustomButton
            isloading={isloading}
            title="Continue"
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </WrapperContainer>
    </KeyboardAvoidingView>
  );
};

export default ForgetPass;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingBottom: hp(4),
    justifyContent: 'space-between',
  },
});
