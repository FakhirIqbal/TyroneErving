import { COLORS } from '../../../utils/theme';
import { CustomCheckboxProps } from './interface';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { TextNormal } from '../customText';

import Icon from 'react-native-vector-icons/Feather';

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <View>
      <Pressable style={styles.container} onPress={() => onChange(!value)}>
        <View style={[styles.checkbox, value && styles.checked]}>
          {value && <Icon name="check" size={16} color={COLORS.white} />}
        </View>
        <TextNormal textStyle={styles.label}>{label}</TextNormal>
      </Pressable>
      {error && <TextNormal textStyle={styles.error}>{error}</TextNormal>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    // width: '80%',
  },
  checkbox: {
    width: wp(5.5),
    height: hp(2.6),
    marginRight: wp(2),
    borderWidth: wp(0.3),
    alignItems: 'center',
    borderRadius: wp(1.5),
    justifyContent: 'center',
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
  checked: {
    borderColor: COLORS.orange,
    backgroundColor: COLORS.orange,
  },
  label: {
    fontWeight: '500',
    fontSize: RFValue(12),
    color: COLORS.primaryText,
  },
  error: {
    marginTop: hp(0.5),
    color: COLORS.error,
    fontSize: RFValue(10),
  },
});

export default CustomCheckbox;
