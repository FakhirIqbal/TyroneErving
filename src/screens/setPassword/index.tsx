import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import AuthHeader from '../../components/authHeader';
import CustomInput from '../../components/common/customInput';
import CustomButton from '../../components/common/customButton';
import { supabase } from '../../config/supabase';
import WrapperContainer from '../../components/common/customWrapper';
import { ScreenNames } from '../../navigation/ScreenName';
import useAuth from '../../services/AuthService';

type SetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

const SetPassword = ({ navigation, route }: any) => {
  const { email } = route.params || {};
  const { resetPass } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SetPasswordFormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = (data: any) => {};

  const handleSignup = async () => {
    const submit = handleSubmit(async (data: any) => {
      resetPass({ ...data, email });
    });
    return submit();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <WrapperContainer>
          <ScrollView
            bounces={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View>
              <AuthHeader title="Set a strong password" />

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
              title="Continue"
              onPress={handleSignup}
              style={{ marginBottom: hp(4) }}
            />
          </ScrollView>
        </WrapperContainer>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SetPassword;

const styles = StyleSheet.create({});
