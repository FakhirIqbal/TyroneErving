import {
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { customImageProps } from './interface';

const Customimage = ({
  source,
  style,
  resizeMode,
  btnStyle,
  onPress,
}: // disabled,
customImageProps) => {
  return (
    <View>
      <Pressable
        disabled={typeof onPress != 'function'}
        onPress={onPress || null}
        style={btnStyle}
      >
        {source?.uri ? (
          <FastImage
            style={{ ...styles.image, ...style }}
            source={{
              ...source,
              cache: FastImage.cacheControl.immutable,
              priority: FastImage.priority.high,
            }}
          />
        ) : (
          <Image
            style={{ ...styles.image, ...style }}
            source={source}
            resizeMode={resizeMode || 'contain'}
          />
        )}
      </Pressable>
    </View>
  );
};

export default Customimage;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
});
