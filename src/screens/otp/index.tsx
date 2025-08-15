import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import WrapperContainer from '../../components/common/customWrapper';
import Header from '../../components/common/Header';
import CustomButton from '../../components/common/customButton';
import CustomOtpInput from '../../components/common/customOtpInput';
import { COLORS } from '../../utils/theme';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenNames } from '../../navigation/ScreenName';

const OTP = ({ navigation }: any) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    console.log('Entered OTP:', otp);
    if (otp.length === 4) {
      navigation.navigate(ScreenNames.DRAWER_HOME);
    }
  };

  return (
    <WrapperContainer>
      <Header title="Verify OTP" navigation={navigation} />

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Enter the 4-digit code sent to your email
          </Text>
          <CustomOtpInput value={otp} setValue={setOtp} />
        </View>
        <CustomButton title="Verify" onPress={handleSubmit} />
      </View>
    </WrapperContainer>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: hp(4),
    justifyContent: 'space-between',
  },
  content: {
    marginTop: hp(7),
    gap: hp(0),
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS.black,
  },
});
