import React from 'react';
import { COLORS } from '../../utils/theme';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import CustomInput from '../../components/common/customInput';
import CustomHeader from '../../components/common/customHeader';
import CustomButton from '../../components/common/customButton';
import Header from '../../components/common/Header';

type ChangePasseord = {
  password: string;
  confirmPassword: string;
};

const ChangePassword = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangePasseord>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = (data: ChangePasseord) => {
    console.log('Form Data:', data);
    navigation.navigate('BottomTab');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <SafeAreaView
          style={{ flex: 1, padding: 20, backgroundColor: COLORS.white }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Header
              title="Change Password"
              navigation={navigation}
            />

            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                marginTop: hp(7),
              }}
            >
              <View>
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
                      label="Create password:"
                      type="password"
                      placeholder="********"
                      value={value}
                      onChangeText={onChange}
                      error={errors.password?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: 'Confirm password is required',
                    validate: value =>
                      value === passwordValue || 'Passwords do not match',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      label="Confirm password:"
                      type="password"
                      placeholder="********"
                      value={value}
                      onChangeText={onChange}
                      error={errors.confirmPassword?.message}
                    />
                  )}
                />
              </View>

              <CustomButton
                title="Save"
                onPress={handleSubmit(onSubmit)}
                style={{ width: '100%' }}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default ChangePassword;
