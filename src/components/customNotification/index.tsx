import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Font } from '../../utils/ImagePath';

import { TextSmall, TextSmaller } from '../common/customText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { NotificProps } from './interface';
import Customimage from '../common/customImage';
import { CustomIcon } from '../common/customIcons';

const CustomNotification = ({ item, index }: NotificProps) => {
  return (
    <View>
      <TextSmall textStyle={{ fontFamily: Font.bold, marginTop: hp(2) }}>
        {item?.day}
      </TextSmall>

      {item?.Noti?.map((i, ind) => (
        <Pressable
          onPress={() => {
            Alert.alert(`${ind}`);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp(2),
          }}
          key={i?.id}
        >
          <Customimage
            source={i?.profileImag}
            style={{
              width: wp(12),
              height: wp(12),
              borderRadius: wp(2),
            }}
            resizeMode={'cover'}
          />

          <View style={{ flex: 1, marginLeft: wp(4) }}>
            <TextSmall numberOfLines={1}>{i?.name}</TextSmall>
            <TextSmaller
              numberOfLines={1}
              textStyle={{ fontSize: RFValue(10) }}
            >
              {i?.element}
            </TextSmaller>
          </View>

          <View style={{ justifyContent: 'space-between' }}>
            <CustomIcon
              onPress={() => {
                Alert.alert('OK');
              }}
              icon="dots-vertical"
              type="materialCommunityIcons"
              size={wp(4)}
              color="#BBBBBB"
              style={{ alignSelf: 'flex-end' }}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CustomIcon
                icon="clock"
                type="feather"
                size={wp(3)}
                color="#036564"
                style={{}}
              />
              <TextSmaller
                textStyle={{ fontSize: RFValue(7), marginLeft: wp(1) }}
              >
                {i?.createdAt}
              </TextSmaller>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default CustomNotification;

const styles = StyleSheet.create({});
