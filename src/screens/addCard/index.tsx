import React from 'react';
import { AddCardProp } from './interface';
import { COLORS } from '../../utils/theme';
import { useForm, Controller } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextSmall } from '../../components/common/customText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Header from '../../components/common/Header';
import CustomHeading from '../../components/customHeading';
import CustomInput from '../../components/common/customInput';
import CustomButton from '../../components/common/customButton';
import WrapperContainer from '../../components/common/customWrapper';

const AddCard = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCardProp>({
    defaultValues: {
      CardHolderName: '',
      CardNumber: '',
      ExpiryDate: '',
      CVVNumber: '',
    },
  });

  const onSubmit = (data: AddCardProp) => {
    console.log('Card Data:', data);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Header title="New Card" navigation={navigation} />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ marginTop: hp(3) }}>
            <CustomHeading text="Add New Card" />
            <TextSmall textStyle={styles.subText}>
              Enter Your Debit Card Details
            </TextSmall>

            <Controller
              control={control}
              name="CardHolderName"
              rules={{ required: 'Card Holder Name is required' }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Card Holder Name"
                  placeholder="Enter your name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.CardHolderName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="CardNumber"
              rules={{ required: 'Card Number is required' }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Card Number"
                  placeholder="Enter your card number"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  error={errors.CardNumber?.message}
                />
              )}
            />

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ width: '48%' }}>
                <Controller
                  control={control}
                  name="ExpiryDate"
                  rules={{ required: 'Expiry Date is required' }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={value}
                      onChangeText={onChange}
                      error={errors.ExpiryDate?.message}
                    />
                  )}
                />
              </View>

              <View style={{ width: '48%' }}>
                <Controller
                  control={control}
                  name="CVVNumber"
                  rules={{ required: 'CVV is required' }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      label="CVV Number"
                      placeholder="Enter CVV"
                      secureTextEntry={true}
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      error={errors.CVVNumber?.message}
                    />
                  )}
                />
              </View>
            </View>
          </View>

          <View style={{ marginTop: hp(5) }}>
            <CustomButton title="Add Card" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: COLORS.white,
  },
  subText: {
    fontWeight: '300',
    marginBottom: hp(3),
    color: COLORS.secondaryText,
  },
});

export default AddCard;
