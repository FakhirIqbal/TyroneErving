import React, { useRef } from 'react';
import { COLORS } from '../../../utils/theme';
import { CustomPhoneInputProp } from './interface'
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import PhoneInput from 'react-native-phone-number-input';


const CustomPhoneInput: React.FC<CustomPhoneInputProp> = ({ label, value, onChange, error }) => {

  const phoneInput = useRef<PhoneInput>(null);

  return (
    <View style={styles.container}>

      {label && <Text style={styles.label}>{label}</Text>}

      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="US"
        layout="first"
        onChangeFormattedText={onChange}
        containerStyle={[
          styles.phoneContainer,
          error && styles.errorBorder,
        ]}
        textContainerStyle={styles.textInput}
        textInputStyle={styles.inputText}
        codeTextStyle={styles.codeText}
        flagButtonStyle={styles.flagButton}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomPhoneInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(1.5),
  },
  label: {
    fontWeight: '500',
    color: COLORS.black,
    marginBottom: hp(1),
    fontSize: RFValue(12),
  },
  phoneContainer: {
    width: '100%',
    height: hp(5.5),
    borderWidth: wp(0.3),
    borderRadius: wp(2),
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
  },
  textInput: {
    paddingVertical: 0,
    borderTopRightRadius: wp(2),
    borderBottomRightRadius: wp(2),
    backgroundColor: COLORS.white,
  },
  inputText: {
    fontSize: RFValue(10),
    color: COLORS.black,
  },
  codeText: {
    fontSize: RFValue(10),
    color: COLORS.black,
  },
  flagButton: {
    width: 0,
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  errorText: {
    marginTop: hp(0.5),
    color: COLORS.error,
    fontSize: RFValue(10),
  },
});
