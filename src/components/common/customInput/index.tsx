import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useState, forwardRef } from 'react';
import { CustomInputProps } from './interface';
import { COLORS } from '../../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CustomInput = forwardRef<TextInput, CustomInputProps>(
  (
    {
      type = 'text',
      label,
      placeholder,
      value,
      onChangeText,
      error,
      editable,
      ...rest
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === 'password';

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View style={styles.inputWrapper}>
          <TextInput
            ref={ref}
            style={[
              styles.input,
              error && { borderColor: COLORS.error, borderWidth: 1 },
            ]}
            placeholder={placeholder}
            placeholderTextColor="#888"
            secureTextEntry={isPassword && !isPasswordVisible}
            keyboardType={type === 'email' ? 'email-address' : 'default'}
            value={value}
            onChangeText={onChangeText}
            {...rest}
            editable={editable}
          />

          {isPassword && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconWrapper}
            >
              <Icon
                name={isPasswordVisible ? 'eye' : 'eye-off'}
                size={18}
                color={COLORS.darkGray}
              />
            </TouchableOpacity>
          )}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  },
);

export default CustomInput;

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
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: hp(5.5),
    borderRadius: wp(2),
    fontSize: RFValue(10),
    borderWidth: wp(0.5),
    paddingHorizontal: wp(4),
    borderColor: COLORS.gray,
    color: COLORS.primaryText,
    backgroundColor: COLORS.white,
  },
  iconWrapper: {
    right: wp(4),
    top: hp('2.5%'),
    position: 'absolute',
    transform: [{ translateY: hp(-1) }],
  },
  errorText: {
    marginTop: hp(0.5),
    color: COLORS.error,
    fontSize: RFValue(10),
  },
});
