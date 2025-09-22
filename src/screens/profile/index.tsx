import React from 'react';
import useUser from '../../utils/useUser';
import Header from '../../components/common/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Customimage from '../../components/common/customImage';

import { COLORS } from '../../utils/theme';
import { ScreenNames } from '../../navigation/ScreenName';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextSmall, TextNormal } from '../../components/common/customText';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const menuItems = [
  {
    icon: 'heart-outline',
    label: 'Wishlist',
    screenName: ScreenNames.WISHLIST,
  },
  {
    icon: 'card-outline',
    label: 'View Card',
    screenName: ScreenNames.PAYMENT_METHOD,
  },
  {
    icon: 'notifications-outline',
    label: 'Notifications',
    screenName: ScreenNames.NOTIFICATION,
  },
  {
    icon: 'lock-closed-outline',
    label: 'Change Password',
    screenName: ScreenNames.CHANGE_PASSWORD,
  },
  {
    icon: 'shield-checkmark-outline',
    label: 'Privacy Policy',
    screenName: ScreenNames.PRIVACY_POLICY,
  },
  {
    icon: 'document-text-outline',
    label: 'Terms & Conditions',
    screenName: ScreenNames.TERMS_AND_CONDITION,
  },
  // {
  //   icon: 'chatbubble-ellipses-outline',
  //   label: 'Give Feedback',
  //   screenName: ScreenNames.GIVE_FEEDBACK,
  // },
];

const Profile = ({ navigation }: any) => {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navigationContainer}>
          <Header
            title="Profile"
            navigation={navigation}
            color={COLORS.white}
            headingStyle={{ color: COLORS.white }}
          />
        </View>

        <View style={styles.info}>
          <Customimage
            source={{ uri: user?.data?.profile_image }}
            style={styles.avatar}
          />
          <View>
            <TextNormal textStyle={{ color: COLORS.white }}>{user?.data?.name}</TextNormal>
            <TextSmall style={{ color: COLORS.white }}>{user?.data?.email}</TextSmall>
          </View>
          <Ionicons
            name="person-add-outline"
            size={26}
            color="#fff"
            style={styles.iconRight}
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>
      </View>

      <ScrollView>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.screenName)}
            style={styles.menuItem}
            activeOpacity={0.7}
          >
            <Ionicons name={item.icon} size={26} color="#f25c2f" />
            <TextSmall textStyle={styles.menuText}>{item.label}</TextSmall>
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
export default Profile;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingTop: hp(6.5),
    marginBottom: hp(2),
    borderBottomRightRadius: wp(7.5),
    borderBottomLeftRadius: wp(7.5),
    backgroundColor: COLORS.orange,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(5),
    paddingTop: hp(3),
    borderBottomLeftRadius: wp(7.5),
    borderBottomRightRadius: wp(7.5),
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(6),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: COLORS.white,
  },
  avatar: {
    width: wp(17),
    height: hp(8),
    borderRadius: 999,
    marginRight: wp(3),
  },
  iconRight: {
    marginLeft: 'auto',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eee',
    borderBottomWidth: 0.6,
    marginHorizontal: wp(5),
    paddingVertical: hp(1.7),
  },
  menuText: {
    flex: 1,
    marginLeft: wp(3),
    fontWeight: '500',
    color: COLORS.secondaryText,
  },
});