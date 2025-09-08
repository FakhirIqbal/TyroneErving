import React from 'react';
import Header from '../../components/common/Header';
import CustomHeading from '../../components/customHeading';
import Customimage from '../../components/common/customImage';
import CustomButton from '../../components/common/customButton';
import WrapperContainer from '../../components/common/customWrapper';

import { COLORS } from '../../utils/theme';
import { Font } from '../../utils/ImagePath';
import { useCallback, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextSmall } from '../../components/common/customText';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const PaymentMethod = ({ navigation }: any) => {

  const [selectedMethod, setSelectedMethod] = useState(null);
  const handleContinue = () => {
    console.log('Selected Method:', selectedMethod);
  };

  const renderItem = useCallback(
    ({ item }: any) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => setSelectedMethod(item.id)}
        style={[
          styles.paymentOption,
          selectedMethod === item.id && styles.selectedCard,
        ]}
      >
        <View style={styles.paymentInfo}>
          <Customimage source={item.icon} style={styles.icon} />
          <TextSmall>{item.label}</TextSmall>
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
            {dummyCards.length > 0 && (
              <>
                <CustomHeading text="Payment Method" reverse />
                <TextSmall textStyle={{ fontFamily: Font.regular }}>
                  Select payment method to continue
                </TextSmall>
              </>
            )}
          </>
        )}
        data={dummyCards}
        ListEmptyComponent={
          <View style={{ flex: 1, alignItems: 'center', marginTop: hp(30) }}>
            <TextSmall style={{ fontSize: RFValue(16), color: COLORS.darkGray }}>
              No Payment Method Added
            </TextSmall>
          </View>
        }
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
export default PaymentMethod;


const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subText: {
    marginTop: 0,
    fontWeight: '300',
    color: COLORS.secondaryText,
  },
  paymentOption: {
    padding: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: wp(0.3),
    borderRadius: wp(2.5),
    marginBottom: hp(1.5),
    borderColor: COLORS.gray,
    justifyContent: 'space-between',
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
    alignItems: 'center',
    borderWidth: wp(0.3),
    borderRadius: wp(2.5),
    justifyContent: 'center',
    borderColor: COLORS.orange,
  },
  selectedDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: COLORS.orange,
  },
  addCardButton: {
    alignItems: 'center',
    borderRadius: wp(2.5),
    paddingVertical: hp(1.5),
    backgroundColor: COLORS.gray,
  },
  addCardText: {
    fontWeight: '500',
    color: COLORS.black,
  },
  bottomContainer: {
    flex: 1,
    marginBottom: hp(4),
    justifyContent: 'flex-end',
  },
});

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