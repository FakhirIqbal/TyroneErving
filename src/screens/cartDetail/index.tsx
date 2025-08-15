import React from 'react';
import { CartDetailProp } from './interface';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Header from '../../components/common/Header';
import CustomHeading from '../../components/customHeading';
import CustomInput from '../../components/common/customInput';
import CustomButton from '../../components/common/customButton';
import CustomDropdown from '../../components/common/customDropdown';
import WrapperContainer from '../../components/common/customWrapper';
import CustomPhoneInput from '../../components/common/customPhoneinput';

const CartDetail = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CartDetailProp>({
    defaultValues: {
      FullName: '',
      PhoneNumber: '',
      EmailAddress: '',
      Country: '',
      State: '',
      PostalCode: '',
      Address: '',
      City: '',
    },
  });

  const onSubmit = (data: CartDetailProp) => {
    console.log('Cart Detail Data:', data);
    navigation.navigate('PaymentMethod');
  };

  return (
    <WrapperContainer>
      <Header title="Cart" navigation={navigation} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <CustomHeading text="Information Details" />

        <Controller
          control={control}
          name="FullName"
          rules={{ required: 'Full name is required' }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Full Name"
              placeholder="Enter your name"
              value={value}
              onChangeText={onChange}
              error={errors.FullName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="PhoneNumber"
          rules={{
            required: 'Phone number is required',
            minLength: { value: 10, message: 'Too short' },
          }}
          render={({ field: { onChange, value } }) => (
            <CustomPhoneInput
              label="Phone Number"
              value={value}
              onChange={onChange}
              error={errors.PhoneNumber?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="EmailAddress"
          rules={{ required: 'Email address is required' }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Email Address"
              placeholder="Enter your email"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              error={errors.EmailAddress?.message}
            />
          )}
        />

        <CustomHeading text="Address Details" />

        <Controller
          control={control}
          name="Country"
          rules={{ required: 'Country is required' }}
          render={({ field: { onChange, value } }) => (
            <CustomDropdown
              label="Country"
              placeholder="Select Country"
              options={[
                { label: 'USA', value: 'usa' },
                { label: 'UK', value: 'uk' },
                { label: 'UAE', value: 'uae' },
              ]}
              value={value}
              onChange={onChange}
              error={errors.Country?.message}
            />
          )}
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Controller
              control={control}
              name="State"
              rules={{ required: 'State is required' }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="State"
                  placeholder="Enter state"
                  value={value}
                  onChangeText={onChange}
                  error={errors.State?.message}
                />
              )}
            />
          </View>

          <View style={styles.halfInput}>
            <Controller
              control={control}
              name="City"
              rules={{ required: 'City is required' }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="City"
                  placeholder="Enter city"
                  value={value}
                  onChangeText={onChange}
                  error={errors.City?.message}
                />
              )}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Controller
              control={control}
              name="PostalCode"
              rules={{ required: 'Postal code is required' }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Postal Code"
                  placeholder="123456"
                  keyboardType="numeric"
                  value={value?.toString()}
                  onChangeText={onChange}
                  error={errors.PostalCode?.message}
                />
              )}
            />
          </View>

          <View style={styles.halfInput}>
            <Controller
              control={control}
              name="Address"
              rules={{ required: 'Address is required' }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Address"
                  placeholder="Street, Apt No."
                  value={value}
                  onChangeText={onChange}
                  error={errors.Address?.message}
                />
              )}
            />
          </View>
        </View>

        <View
          style={{
            marginVertical: hp(2),
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <CustomButton title="Continue" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default CartDetail;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: hp(3),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(2),
  },
  halfInput: {
    width: '48%',
  },
});
