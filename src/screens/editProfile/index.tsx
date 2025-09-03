import React, { useState } from 'react';
import { COLORS } from '../../utils/theme';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import CustomInput from '../../components/common/customInput';
import CustomButton from '../../components/common/customButton';
import CustomDropdown from '../../components/common/customDropdown';
import CustomPhoneInput from '../../components/common/customPhoneinput';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import WrapperContainer from '../../components/common/customWrapper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Header from '../../components/common/Header';
import Customimage from '../../components/common/customImage';
import EditProHook from './useEditPro';
import { PhoneNumberValue } from '../../components/common/customPhoneinput/interface';
import useUser from '../../utils/useUser';

const EditProfile = ({ navigation }: any) => {
  const {
    onSelect,
    control,
    errors,
    profileImage,
    handleSubmit,
    onEdit,
    loading,
  } = EditProHook();

  const onSubmit = (data: any) => {
    console.log('Profile Data:', data);
  };
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onEditProfile = () => {
    if (!isEditing) {
      return;
    }
    const submit = handleSubmit(data => onEdit(data, navigation));
    return submit();
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
            // justifyContent: 'space-between',
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Header title="Profile" navigation={navigation} />

          <View>
            <View
              style={{
                position: 'relative',
                alignSelf: 'center',
                marginTop: 24,
              }}
            >
              <Customimage
                source={{ uri: profileImage?.path || profileImage }}
                style={styles.avatar}
              />

              {isEditing && (
                <SimpleLineIcons
                  onPress={() => {
                    onSelect();
                  }}
                  name="pencil"
                  style={styles.editIcon}
                  size={16}
                  color="#fff"
                />
              )}
            </View>
            <Text style={styles.name}>{user?.data?.name}</Text>

            <View>
              <Controller
                control={control}
                name="Name"
                rules={{ required: 'Name is required' }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    label="Name:"
                    placeholder="Enter your name"
                    value={value}
                    onChangeText={onChange}
                    error={errors.Name?.message}
                    editable={isEditing}
                  />
                )}
              />

              {/* <Controller
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
                /> */}
              {/* <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: 'Phone number is required',
                  validate: (value: PhoneNumberValue) =>
                    value?.is_valid ? true : 'Invalid phone number format',
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  console.log('Changed Values', value);
                  return (
                    <CustomPhoneInput
                      label="Phone Number"
                      value={value}
                      onChange={onChange}
                      error={error?.message}
                    />
                  );
                }}
              /> */}

              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: 'Phone number is required',
                  validate: (value: PhoneNumberValue) => {
                    if (!value) return 'Phone number is required';
                    return value.is_valid
                      ? true
                      : 'Invalid phone number format';
                  },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <CustomPhoneInput
                      label="Phone Number"
                      value={value}
                      onChange={onChange}
                      error={error?.message}
                      disabled={!isEditing}
                    />
                  );
                }}
              />
              {/* <Controller
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
                /> */}
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginBottom: heightPercentageToDP(4),
            }}
          >
            {/* <CustomButton
              title="Update"
              onPress={handleSubmit(onSubmit)}
              style={{ width: '100%' }}
            /> */}
            <CustomButton
              title={isEditing ? 'Save Changes' : 'Edit Profile'}
              onPress={!isEditing ? toggleEdit : onEditProfile}
              isloading={loading}
            />
          </View>
        </ScrollView>
      </WrapperContainer>
    </KeyboardAvoidingView>
  );
};
export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  editIcon: {
    right: 0,
    bottom: 0,
    padding: 7,
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: COLORS.orange,
  },
  name: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: COLORS.black,
  },
});
