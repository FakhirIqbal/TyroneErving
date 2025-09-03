import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/theme';
import { ScreenNames } from '../../navigation/ScreenName';
import Header from '../../components/common/Header';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Customimage from '../../components/common/customImage';
import useUser from '../../utils/useUser';

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
  {
    icon: 'chatbubble-ellipses-outline',
    label: 'Give Feedback',
    screenName: ScreenNames.GIVE_FEEDBACK,
  },
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
            <Text style={styles.name}>{user?.data?.name}</Text>
            <Text style={styles.email}>{user?.data?.email}</Text>
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
            <Text style={styles.menuText}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.orange,
    paddingTop: 60,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginBottom: 20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 15,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    color: COLORS.white,
    fontSize: 13,
  },
  iconRight: {
    marginLeft: 'auto',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    marginHorizontal: 20,
    borderBottomWidth: 0.6,
    borderColor: '#eee',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: COLORS.secondaryText,
  },
});

export default Profile;
