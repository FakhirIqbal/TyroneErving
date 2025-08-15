import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { customtextProp } from './interface';
import React from 'react';
import { Font } from '../../../utils/ImagePath';

export const TextHuge: React.FC<customtextProp> = ({
  children,
  textStyle,
  ...rest
}) => {
  return (
    <Text style={[styles.text, styles.huge, textStyle]} {...rest}>
      {children}
    </Text>
  );
};
export const TextNormal: React.FC<customtextProp> = ({
  children,
  textStyle,
  ...rest
}) => {
  return (
    <Text style={[styles.text, styles.normal, textStyle]} {...rest}>
      {children}
    </Text>
  );
};

export const TextSmaller: React.FC<customtextProp> = ({
  children,
  textStyle,
  ...rest
}) => {
  return (
    <Text style={[styles.text, styles.smaller, textStyle]} {...rest}>
      {children}
    </Text>
  );
};

export const TextSmall: React.FC<customtextProp> = ({
  children,
  textStyle,
  ...rest
}) => {
  return (
    <Text style={[styles.text, styles.small, textStyle]} {...rest}>
      {children}
    </Text>
  );
};
export const TextBig: React.FC<customtextProp> = ({
  children,
  textStyle,
  ...rest
}) => {
  return (
    <Text style={[styles.text, styles.big, textStyle]} {...rest}>
      {children}
    </Text>
  );
};

export const TextBigger: React.FC<customtextProp> = ({
  children,
  textStyle,
  ...rest
}) => {
  return (
    <Text style={[styles.text, styles.bigger, textStyle]} {...rest}>
      {children}
    </Text>
  );
};

export const TextBiggest: React.FC<customtextProp> = ({
  children,
  textStyle,
  ...rest
}) => {
  return (
    <Text style={[styles.text, styles.biggest, textStyle]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.textBlack,
    fontFamily: Font.extraBold,
  },
  huge: {
    fontSize: RFValue(25),
  },
  normal: {
    fontSize: RFValue(14),
  },
  smaller: {
    fontSize: RFValue(11),
  },

  small: {
    fontSize: RFValue(12),
  },

  big: {
    fontSize: RFValue(16),
  },
  bigger: {
    fontSize: RFValue(18),
  },
  biggest: {
    fontSize: RFValue(20),
  },
});
