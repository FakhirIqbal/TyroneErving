import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { TextHuge } from '../customText';
import { Font } from '../../../utils/ImagePath';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomIcon } from '../customIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { HeaderProps } from './interface';

const Header = ({
  navigation,
  title,
  containerStyle,
  color,
  headingStyle,
  onBackPress,
}: HeaderProps) => {
  return (
    <View
      style={{
        ...styles.container,
        ...containerStyle,
      }}
    >
      <Pressable
        onPress={
          typeof onBackPress === 'function'
            ? onBackPress
            : () => navigation.goBack()
        }
        style={{
          width: widthPercentageToDP(6),
        }}
      >
        <CustomIcon
          type="antdesign"
          icon="arrowleft"
          size={widthPercentageToDP(6)}
          color={color}
        />
      </Pressable>

      <TextHuge
        textStyle={{
          ...styles.heading,
          flex: 1,
          ...headingStyle,
          fontFamily: Font.extraBold,
        }}
      >
        {title}
      </TextHuge>
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentageToDP(2),
    borderColor: '#E5EBF1',
  },
  storyImage: {
    width: widthPercentageToDP(11),
    height: widthPercentageToDP(11),
    borderRadius: widthPercentageToDP(11),
    marginHorizontal: widthPercentageToDP(3),
  },
  heading: {
    fontFamily: Font.bold,
    fontSize: RFValue(22),

    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
