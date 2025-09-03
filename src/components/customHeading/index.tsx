import React from 'react';
import { COLORS } from '../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { Text, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextBiggest, TextSmall } from '../common/customText';
import { Font } from '../../utils/ImagePath';

type Props = {
  text: string;
  reverse?: boolean;
  style?: StyleProp<ViewStyle>;
};

const customHeading: React.FC<Props> = ({ style, text, reverse = false }) => {
  const [firstWord, ...rest] = text.trim().split(' ');
  const secondWord = rest.join(' ');

  return (
    <View style={[styles.container, style]}>
      {reverse ? (
        <>
          <TextBiggest textStyle={styles.bold}>{firstWord} </TextBiggest>
          <TextBiggest textStyle={styles.normal}>{secondWord}</TextBiggest>
        </>
      ) : (
        <>
          <TextBiggest textStyle={styles.normal}>{firstWord} </TextBiggest>
          <TextBiggest textStyle={styles.bold}>{secondWord}</TextBiggest>
        </>
      )}
    </View>
  );
};

export default customHeading;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: hp(1.5),
    alignItems: 'baseline',
  },
  normal: {
    fontFamily: Font.light,
    // fontSize: RFValue(22),
    color: COLORS.black,
  },
  bold: {
    // fontSize: RFValue(22),
    // fontWeight: '700',
    fontFamily: Font.bold,
    color: COLORS.black,
  },
});
