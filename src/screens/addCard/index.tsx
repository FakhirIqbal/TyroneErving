// import React from 'react';
// import { AddCardProp } from './interface';
// import { COLORS } from '../../utils/theme';
// import { useForm, Controller } from 'react-hook-form';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { View, ScrollView, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { TextSmall } from '../../components/common/customText';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';

// import Header from '../../components/common/Header';
// import CustomHeading from '../../components/customHeading';
// import CustomInput from '../../components/common/customInput';
// import CustomButton from '../../components/common/customButton';
// import WrapperContainer from '../../components/common/customWrapper';

// const AddCard = ({ navigation }: any) => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<AddCardProp>({
//     defaultValues: {
//       CardHolderName: '',
//       CardNumber: '',
//       ExpiryDate: '',
//       CVVNumber: '',
//     },
//   });

//   const onSubmit = (data: AddCardProp) => {
//     console.log('Card Data:', data);
//     navigation.goBack();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         bounces={false}
//         contentContainerStyle={{ flexGrow: 1 }}
//         showsVerticalScrollIndicator={false}
//       >
//         <Header title="New Card" navigation={navigation} />
//         <View style={{ flex: 1, justifyContent: 'space-between' }}>
//           <View style={{ marginTop: hp(3) }}>
//             <CustomHeading text="Add New Card" />
//             <TextSmall textStyle={styles.subText}>
//               Enter Your Debit Card Details
//             </TextSmall>

//             <Controller
//               control={control}
//               name="CardHolderName"
//               rules={{ required: 'Card Holder Name is required' }}
//               render={({ field: { onChange, value } }) => (
//                 <CustomInput
//                   label="Card Holder Name"
//                   placeholder="Enter your name"
//                   value={value}
//                   onChangeText={onChange}
//                   error={errors.CardHolderName?.message}
//                 />
//               )}
//             />

//             <Controller
//               control={control}
//               name="CardNumber"
//               rules={{ required: 'Card Number is required' }}
//               render={({ field: { onChange, value } }) => (
//                 <CustomInput
//                   label="Card Number"
//                   placeholder="Enter your card number"
//                   keyboardType="numeric"
//                   value={value}
//                   onChangeText={onChange}
//                   error={errors.CardNumber?.message}
//                 />
//               )}
//             />

//             <View
//               style={{ flexDirection: 'row', justifyContent: 'space-between' }}
//             >
//               <View style={{ width: '48%' }}>
//                 <Controller
//                   control={control}
//                   name="ExpiryDate"
//                   rules={{ required: 'Expiry Date is required' }}
//                   render={({ field: { onChange, value } }) => (
//                     <CustomInput
//                       label="Expiry Date"
//                       placeholder="MM/YY"
//                       value={value}
//                       onChangeText={onChange}
//                       error={errors.ExpiryDate?.message}
//                     />
//                   )}
//                 />
//               </View>

//               <View style={{ width: '48%' }}>
//                 <Controller
//                   control={control}
//                   name="CVVNumber"
//                   rules={{ required: 'CVV is required' }}
//                   render={({ field: { onChange, value } }) => (
//                     <CustomInput
//                       label="CVV Number"
//                       placeholder="Enter CVV"
//                       secureTextEntry={true}
//                       keyboardType="numeric"
//                       value={value}
//                       onChangeText={onChange}
//                       error={errors.CVVNumber?.message}
//                     />
//                   )}
//                 />
//               </View>
//             </View>
//           </View>

//           <View style={{ marginTop: hp(5) }}>
//             <CustomButton title="Add Card" onPress={handleSubmit(onSubmit)} />
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp(5),
//     backgroundColor: COLORS.white,
//   },
//   subText: {
//     fontWeight: '300',
//     marginBottom: hp(3),
//     color: COLORS.secondaryText,
//   },
// });

// export default AddCard;
import React, { useState } from 'react';
import { AddCardProp } from './interface';
import { COLORS } from '../../utils/theme';
import { useForm, Controller } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextSmall } from '../../components/common/customText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useStripe } from '@stripe/stripe-react-native';

// import { useCards } from '../../hooks/useCards';
import MaskInput from 'react-native-mask-input';

import Header from '../../components/common/Header';
import CustomHeading from '../../components/customHeading';
import CustomInput from '../../components/common/customInput';
import CustomButton from '../../components/common/customButton';
import WrapperContainer from '../../components/common/customWrapper';
import useUser from '../../utils/useUser';

const AddCard = ({ navigation }: any) => {
  const { createPaymentMethod } = useStripe();
  const { user } = useUser();
  // const { addCard } = useCards();
  const [loading, setLoading] = useState(false);
  const [rememberCard, setRememberCard] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddCardProp>({
    defaultValues: {
      CardHolderName: '',
      CardNumber: '',
      ExpiryDate: '',
      CVVNumber: '',
    },
  });

  const cardNumber = watch('CardNumber');
  const expiryDate = watch('ExpiryDate');
  const cvvNumber = watch('CVVNumber');

  const onSubmit = async (data: AddCardProp) => {
    if (!data.CardNumber || !data.ExpiryDate || !data.CVVNumber) {
      Alert.alert('Error', 'Please complete all card details');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Please log in to add a card');
      return;
    }

    setLoading(true);

    try {
      // Extract month and year from expiry date (format: MM/YY)
      const [expMonth, expYear] = data.ExpiryDate.split('/');
      const fullExpYear = `20${expYear}`; // Convert YY to YYYY

      // Create payment method with Stripe
      const { paymentMethod, error } = await createPaymentMethod({
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            name: data.CardHolderName.trim(),
          },
        },
      });

      if (error) {
        Alert.alert('Payment Error', error.message);
        return;
      }

      if (!paymentMethod) {
        throw new Error('Failed to create payment method');
      }

      // Save card to database if rememberCard is true
      // if (rememberCard) {
      //   await addCard(
      //     paymentMethod.id,
      //     paymentMethod.card?.brand || 'unknown',
      //     paymentMethod.card?.last4 || '',
      //     parseInt(expMonth),
      //     parseInt(fullExpYear),
      //     data.CardHolderName.trim(),
      //     true // Set as default
      //   );
      // }

      Alert.alert('Success', 'Card added successfully!');
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Format card number with spaces (XXXX XXXX XXXX XXXX)
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/(\d{1,4})/g);
    return match ? match.join(' ') : '';
  };

  // Handle card number input
  const handleCardNumberChange = (text: string) => {
    const formatted = formatCardNumber(text);
    setValue('CardNumber', formatted, { shouldValidate: true });
  };

  // Handle expiry date input (MM/YY format)
  const handleExpiryDateChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 2) {
      setValue('ExpiryDate', cleaned, { shouldValidate: true });
    } else if (cleaned.length <= 4) {
      setValue('ExpiryDate', `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`, {
        shouldValidate: true,
      });
    }
  };

  return (
    <WrapperContainer>
      <Header
        title="New Card"
        // onPress={() => {
        //   navigation.goBack();
        // }}
      />
      <ScrollView
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{ flex: 1, justifyContent: 'space-between', padding: wp(5) }}
        >
          <View style={{ marginTop: hp(3) }}>
            <CustomHeading text="Add New Card" />
            <TextSmall textStyle={styles.subText}>
              Enter Your Debit Card Details
            </TextSmall>

            <Controller
              control={control}
              name="CardHolderName"
              rules={{
                required: 'Card Holder Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Card Holder Name"
                  placeholder="Enter your name as shown on card"
                  value={value}
                  onChangeText={onChange}
                  error={errors.CardHolderName?.message}
                  autoCapitalize="words"
                />
              )}
            />

            <Controller
              control={control}
              name="CardNumber"
              rules={{
                required: 'Card Number is required',
                validate: value =>
                  value.replace(/\s/g, '').length === 16 ||
                  'Card number must be 16 digits',
              }}
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextSmall textStyle={styles.label}>Card Number</TextSmall>
                  <MaskInput
                    value={value}
                    onChangeText={(masked, unmasked) => {
                      onChange(masked);
                    }}
                    mask={[
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    style={[
                      styles.input,
                      errors.CardNumber && styles.inputError,
                    ]}
                  />
                  {errors.CardNumber && (
                    <TextSmall textStyle={styles.errorText}>
                      {errors.CardNumber.message}
                    </TextSmall>
                  )}
                </View>
              )}
            />

            <View style={styles.rowContainer}>
              <View style={styles.halfInputContainer}>
                <Controller
                  control={control}
                  name="ExpiryDate"
                  rules={{
                    required: 'Expiry Date is required',
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                      message: 'Invalid format (MM/YY)',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.inputContainer}>
                      <TextSmall textStyle={styles.label}>
                        Expiry Date
                      </TextSmall>
                      <MaskInput
                        value={value}
                        onChangeText={(masked, unmasked) => {
                          onChange(masked);
                        }}
                        mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                        placeholder="MM/YY"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        style={[
                          styles.input,
                          errors.ExpiryDate && styles.inputError,
                        ]}
                      />
                      {errors.ExpiryDate && (
                        <TextSmall textStyle={styles.errorText}>
                          {errors.ExpiryDate.message}
                        </TextSmall>
                      )}
                    </View>
                  )}
                />
              </View>

              <View style={styles.halfInputContainer}>
                <Controller
                  control={control}
                  name="CVVNumber"
                  rules={{
                    required: 'CVV is required',
                    minLength: {
                      value: 3,
                      message: 'CVV must be 3-4 digits',
                    },
                    maxLength: {
                      value: 4,
                      message: 'CVV must be 3-4 digits',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.inputContainer}>
                      <TextSmall textStyle={styles.label}>CVV</TextSmall>
                      <MaskInput
                        value={value}
                        onChangeText={(masked, unmasked) => {
                          onChange(masked);
                        }}
                        mask={[/\d/, /\d/, /\d/, /\d?/]}
                        placeholder="123"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        secureTextEntry={true}
                        style={[
                          styles.input,
                          errors.CVVNumber && styles.inputError,
                        ]}
                      />
                      {errors.CVVNumber && (
                        <TextSmall textStyle={styles.errorText}>
                          {errors.CVVNumber.message}
                        </TextSmall>
                      )}
                    </View>
                  )}
                />
              </View>
            </View>

            <View style={styles.rememberCardContainer}>
              <TouchableOpacity
                onPress={() => setRememberCard(!rememberCard)}
                style={styles.checkboxContainer}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberCard && styles.checkboxChecked,
                  ]}
                >
                  {rememberCard && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <TextSmall textStyle={styles.checkboxLabel}>
                  Remember this card for future payments
                </TextSmall>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: hp(5) }}>
            <CustomButton
              title={loading ? 'Adding Card...' : 'Add Card'}
              onPress={handleSubmit(onSubmit)}
              // disabled={loading}
              // loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  subText: {
    fontWeight: '300',
    marginBottom: hp(3),
    color: COLORS.secondaryText,
  },
  inputContainer: {
    marginBottom: hp(2),
  },
  label: {
    fontSize: RFValue(14),
    fontWeight: '500',
    marginBottom: hp(1),
    color: COLORS.primaryText,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: wp(4),
    fontSize: RFValue(16),
    color: COLORS.primaryText,
    backgroundColor: COLORS.white,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: RFValue(12),
    marginTop: hp(0.5),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    width: '48%',
  },
  rememberCardContainer: {
    marginTop: hp(3),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: wp(5),
    height: wp(5),
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 4,
    marginRight: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.textBlack,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },
  checkboxLabel: {
    color: COLORS.secondaryText,
    fontSize: RFValue(14),
  },
});

export default AddCard;
