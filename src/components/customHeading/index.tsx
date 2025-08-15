import React from 'react';
import { COLORS } from '../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { Text, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
          <Text style={styles.bold}>{firstWord} </Text>
          <Text style={styles.normal}>{secondWord}</Text>
        </>
      ) : (
        <>
          <Text style={styles.normal}>{firstWord} </Text>
          <Text style={styles.bold}>{secondWord}</Text>
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
  },
  normal: {
    fontWeight: '300',
    fontSize: RFValue(22),
    color: COLORS.black,
  },
  bold: {
    fontSize: RFValue(22),
    fontWeight: '700',
    color: COLORS.black,
  },
});
