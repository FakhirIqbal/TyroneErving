
import React from 'react';
import Header from '../../components/common/Header';
import WrapperContainer from '../../components/common/customWrapper';

import { Font } from '../../utils/ImagePath';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { TextSmall, TextNormal } from '../../components/common/customText';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TermsCondition = ({ navigation }: any) => {
  const data = [
    {
      id: 0,
      heading: '1. Account Registration:',
      desc: ' - You must create an account to use certain features of AgileSpace.- You are responsible for providing accurate and up-to-date information during the registration process.- You must safeguard your account credentials and notify us immediately of any unauthorized access or use of your account.',
    },
    {
      id: 1,
      heading: '2. Product Information and Pricing:',
      desc: '- AgileSpace strives to provide accurate product descriptions, images, and pricing information.- We reserve the right to modify product details and prices without prior notice.- In the event of an error, we may cancel or refuse orders placed for incorrectly priced products.',
    },
    {
      id: 2,
      heading: '3. Order Placement and Fulfillment:',
      desc: '- By placing an order on AgileSpace, you agree to purchase the selected products at the stated price.- We reserve the right to accept or reject any order, and we may cancel orders due to product unavailability, pricing errors, or suspected fraudulent activity.- Once an order is confirmed, we will make reasonable efforts to fulfill and deliver it in a timely manner.',
    },

    {
      id: 3,
      heading: '4. Payment',
      desc: ' - AgileSpace supports various payment methods, including credit/debit cards and online payment platforms.- By providing payment information, you represent and warrant that you are authorized to use the chosen payment method.- All payments are subject to verification and approval by relevant financial institutions.',
    },

    {
      id: 4,
      heading: '5. Shipping and Delivery:',
      desc: '- AgileSpace will make reasonable efforts to ensure timely delivery of products. - Shipping times may vary based on factors beyond our control, such as location, weather conditions, or carrier delays. - Risk of loss or damage to products passes to you upon delivery.',
    },
    {
      id: 5,
      heading: '6. Returns and Refunds:',
      desc: '- AgileSpace return and refund policies are outlined separately and govern the process for returning products and seeking refunds.- Certain products may be non-returnable or subject to specific conditions.',
    },
    {
      id: 6,
      heading: '7. Intellectual Property:',
      desc: ' - AgileSpace and its content, including logos, trademarks, text, images, and software, are protected by intellectual property rights.- You may not use, reproduce, modify, distribute, or display any part of AgileSpace without our prior written consent.',
    },

    {
      id: 7,
      heading: '8. User Conduct:',
      desc: '- You agree to use AgileSpace in compliance with applicable laws and regulations.- You will not engage in any activity that disrupts or interferes with the functioning of AgileSpace or infringes upon the rights of others.- Any unauthorized use or attempt to access restricted areas or user accounts is strictly prohibited.',
    },

    {
      id: 8,
      heading: '9. Limitation of Liability:',
      desc: ' - AgileSpace and its affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use our app or any products purchased through it. - We do not guarantee the accuracy, completeness, or reliability of information provided on AgileSpace.',
    },
    {
      id: 9,
      heading: '10. Governing Law:',
      desc: '  - These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction]. - Any disputes arising out of or relating to these Terms shall be resolved in the courts of [Jurisdiction]. If you have any questions or concerns regarding these Terms and Conditions, please contact our customer support. By using AgileSpace, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.',
    },
  ];
  return (
    <WrapperContainer>
      <Header
        headingStyle={{ fontSize: RFValue(20), fontFamily: Font.semiBold }}
        title={'Terms & Conditions'}
        navigation={navigation}
      />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <TextSmall textStyle={{ color: '#677282', marginTop: hp(1) }}>
          Welcome to AgileSpace! These Terms and Conditions ("Terms") govern
          your use of our e-commerce app. By accessing or using AgileSpace, you
          agree to be bound by these Terms. Please read them carefully before
          proceeding.
        </TextSmall>

        <FlatList
          bounces={false}
          scrollEnabled={false}
          data={data}
          contentContainerStyle={{ paddingBottom: hp(4) }}
          renderItem={({ item, index }) => (
            <View>
              <TextNormal style={{ marginTop: hp(2) }}>
                {item.heading}
              </TextNormal>

              <TextSmall textStyle={{ color: '#677282', marginTop: hp(1) }}>
                {item?.desc}
              </TextSmall>
            </View>
          )}
        />
      </ScrollView>
    </WrapperContainer>
  );
};

export default TermsCondition;

const styles = StyleSheet.create({});