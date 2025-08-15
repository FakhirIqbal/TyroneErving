import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { COLORS } from '../../../utils/theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type Props = {
  value: string;
  setValue: (val: string) => void;
  length?: number;
};

const CustomOtpInput = ({ value, setValue, length = 4 }: Props) => {
  const inputs = new Array(length).fill('');

  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text.slice(-1);
    setValue(newValue.join(''));
  };

  return (
    <View style={styles.container}>
      {inputs.map((_, index) => (
        <TextInput
          key={index}
          style={styles.inputBox}
          keyboardType="number-pad"
          maxLength={1}
          value={value[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
        />
      ))}
    </View>
  );
};

export default CustomOtpInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: wp(5),
  },
  inputBox: {
    width: wp(15),
    height: wp(15),
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: wp(3),
    textAlign: 'center',
    fontSize: wp(6),
    color: COLORS.black,
    backgroundColor: '#F9F9F9',
  },
});
