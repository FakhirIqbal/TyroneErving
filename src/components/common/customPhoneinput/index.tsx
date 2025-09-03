import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import PhoneInput from 'react-native-phone-number-input';
import { COLORS } from '../../../utils/theme';
import { CustomPhoneInputProp } from './interface';

const CustomPhoneInput: React.FC<CustomPhoneInputProp> = ({
  label,
  value,
  onChange,
  error,
  disabled,
}) => {
  const phoneInput = useRef<PhoneInput>(null);
  const [defaultCode, setDefaultCode] = useState<string>(
    value?.country_code ? value.country_code : 'US',
  );
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (value?.country_code) {
      setDefaultCode(value.country_code);
    }
  }, [value?.country_code]);

  const validatePhoneNumber = (text: string, country: any = null) => {
    if (!phoneInput.current) return { isValid: false, countryCode: '' };

    try {
      let countryCode = '';

      if (country) {
        countryCode = country.cca2;
      } else {
        countryCode = phoneInput.current.getCountryCode() || '';
      }

      const isValidNumber = phoneInput.current.isValidNumber(text);

      return {
        isValid: isValidNumber,
        countryCode: countryCode,
      };
    } catch (error) {
      return {
        isValid: false,
        countryCode: phoneInput.current.getCountryCode() || '',
      };
    }
  };

  const handleTextChange = (text: string) => {
    setIsTouched(true);

    if (!phoneInput.current) return;

    const validation = validatePhoneNumber(text);
    const countryCode = validation.countryCode;

    const getCallingCode = phoneInput.current.getCallingCode();

    let nationalNumber = text;
    if (text.startsWith(`+${getCallingCode}`)) {
      nationalNumber = text.replace(`+${getCallingCode}`, '');
    }

    onChange({
      country_code: countryCode,
      national_number: nationalNumber,
      formatted_number: text,
      is_valid: validation.isValid,
    });
  };

  const handleCountryChange = (country: any) => {
    setIsTouched(true);

    if (!phoneInput.current) return;

    const currentNumber = phoneInput.current.state.number || '';

    const newCountryCode = country.callingCode[0];
    const formattedNumber = `+${newCountryCode}${currentNumber}`;

    const validation = validatePhoneNumber(formattedNumber, country);

    onChange({
      country_code: country.cca2,
      national_number: currentNumber,
      formatted_number: formattedNumber,
      is_valid: validation.isValid,
    });
  };

  const shouldShowError = error && isTouched;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <PhoneInput
        disabled={disabled}
        ref={phoneInput}
        defaultValue={value?.national_number || ''}
        defaultCode={defaultCode as any}
        layout="first"
        onChangeFormattedText={handleTextChange}
        onChangeCountry={handleCountryChange}
        containerStyle={[
          styles.phoneContainer,
          shouldShowError && styles.errorBorder,
        ]}
        textContainerStyle={styles.textInput}
        textInputStyle={styles.inputText}
        codeTextStyle={styles.codeText}
        flagButtonStyle={styles.flagButton}
      />

      {shouldShowError && <Text style={styles.errorText}>{error}</Text>}
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
