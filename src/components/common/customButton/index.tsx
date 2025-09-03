import { COLORS } from '../../../utils/theme';
import { CustomButtonProps } from './interface';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Feather';
import React from 'react';

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  style,
  onPress,
  iconName,
  variant = 'default',
  isloading,
}) => {
  const isDark = variant === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        isDark ? styles.darkButton : styles.defaultButton,
        style,
      ]}
      disabled={typeof onPress !== 'function' || isloading}
    >
      <View style={styles.content}>
        {isDark && iconName && (
          <Icon
            name={iconName}
            size={16}
            color="#333"
            style={{ marginRight: 8 }}
          />
        )}
        {isloading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            style={[styles.text, isDark ? styles.darkText : styles.defaultText]}
          >
            {' '}
            {title}{' '}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: hp(6),
    borderRadius: wp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultButton: {
    backgroundColor: COLORS.orange,
  },
  darkButton: {
    backgroundColor: COLORS.gray,
  },
  text: {
    fontSize: RFValue(12),
    fontWeight: '600',
  },
  defaultText: {
    color: COLORS.white,
  },
  darkText: {
    color: COLORS.primaryText,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default React.memo(CustomButton);
