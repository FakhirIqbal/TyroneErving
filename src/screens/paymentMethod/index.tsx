import React, { useCallback, useState } from 'react';
import { COLORS } from '../../utils/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextSmall } from '../../components/common/customText';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Text,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CustomHeading from '../../components/customHeading';
import CustomButton from '../../components/common/customButton';
import Header from '../../components/common/Header';
import WrapperContainer from '../../components/common/customWrapper';
import Customimage from '../../components/common/customImage';
import { Font } from '../../utils/ImagePath';

const dummyCards = [
  {
    id: '1',
    type: 'card',
    label: '**** **** **** 4567',
    icon: require('../../assets/cardLogo/M.png'),
  },
  {
    id: '2',
    type: 'paypal',
    label: 'PayPal',
    icon: require('../../assets/cardLogo/P.png'),
  },
  {
    id: '3',
    type: 'apple',
    label: 'Apple Pay',
    icon: require('../../assets/cardLogo/A.png'),
  },
  {
    id: '4',
    type: 'google',
    label: 'Google Pay',
    icon: require('../../assets/cardLogo/G.png'),
  },
];

const PaymentMethod = ({ navigation }: any) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleContinue = () => {
    console.log('Selected Method:', selectedMethod);
  };
  const renderItem = useCallback(
    ({ item }: any) => (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.paymentOption,
          selectedMethod === item.id && styles.selectedCard,
        ]}
        onPress={() => setSelectedMethod(item.id)}
      >
        <View style={styles.paymentInfo}>
          <Customimage source={item.icon} style={styles.icon} />
          <Text style={{ fontWeight: '400' }}>{item.label}</Text>
        </View>
        <View style={styles.radioCircle}>
          {selectedMethod === item.id && <View style={styles.selectedDot} />}
        </View>
      </TouchableOpacity>
    ),
    [selectedMethod],
  );

  return (
    <WrapperContainer>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{ marginBottom: hp(4) }}
        ListHeaderComponent={() => (
          <>
            <Header navigation={navigation} title="Payment" />
            <CustomHeading text="Payment Method" reverse />
            <TextSmall textStyle={{ fontFamily: Font.regular }}>
              Select payment method to continue
            </TextSmall>
          </>
        )}
        data={dummyCards}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: hp(15) }}
      />

      <View style={styles.bottomContainer}>
        <CustomButton
          title="Add New Card"
          variant="dark"
          iconName="plus"
          onPress={() => navigation.navigate('AddCard')}
        />
        <CustomButton
          title="Continue"
          onPress={handleContinue}
          style={{ marginTop: hp(2) }}
        />
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subText: {
    fontWeight: '300',
    marginTop: 0,
    color: COLORS.secondaryText,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: wp(0.3),
    borderColor: COLORS.gray,
    borderRadius: wp(2.5),
    padding: wp(4),
    marginBottom: hp(1.5),
  },
  selectedCard: {
    borderColor: COLORS.orange,
    backgroundColor: COLORS.lightOrange,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: wp(6),
    height: wp(6),
    marginRight: wp(3),
    resizeMode: 'contain',
  },
  radioCircle: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    borderWidth: wp(0.3),
    borderColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: COLORS.orange,
  },
  addCardButton: {
    backgroundColor: COLORS.gray,
    paddingVertical: hp(1.5),
    borderRadius: wp(2.5),
    alignItems: 'center',
  },
  addCardText: {
    color: COLORS.black,
    fontWeight: '500',
  },
  bottomContainer: {
    marginBottom: hp(4),
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default PaymentMethod;
