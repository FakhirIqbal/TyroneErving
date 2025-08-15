// import React from 'react';
// import { COLORS } from '../../utils/theme';
// import { ScrollView, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// import CustomHeader from '../../components/common/customHeader';

// const PrivacyPolicy = ({ navigation }: any) => {
//     return (
//         <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: COLORS.white }}>
//             <ScrollView
//                 contentContainerStyle={{ flexGrow: 1 }}
//                 showsVerticalScrollIndicator={false}
//             >
//                 <CustomHeader title="Privacy Policy" onBack={() => navigation.goBack()} />

//                 <View style={{ marginTop: hp(2.5) }}>
//                     <Text style={{ fontWeight: '600', fontSize: RFValue(13), marginBottom: hp(2) }}>
//                         Consectetur Sadipscing Elitr
//                     </Text>
//                     <Text style={{ marginBottom: hp(1.5), fontWeight: '300' }}>
//                         There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
//                     </Text>
//                     <Text style={{ marginBottom: hp(1.5), fontWeight: '300' }}>
//                         If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
//                     </Text>
//                     <Text style={{ marginBottom: hp(1.5), fontWeight: '300' }}>
//                         It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
//                     </Text>
//                 </View>

//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default PrivacyPolicy;

import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import WrapperContainer from '../../components/common/customWrapper';
import Header from '../../components/common/Header';
import { RFValue } from 'react-native-responsive-fontsize';
import { Font } from '../../utils/ImagePath';
import {
  TextHuge,
  TextNormal,
  TextSmall,
  TextSmaller,
} from '../../components/common/customText';

const PrivacyPolicy = ({ navigation }: any) => {
  const data = [
    {
      id: 0,
      mainHeading: 'Information Collection',
      subHeading: [
        {
          id: 0,
          title: 'Personal Identification Information:',
          desc: 'We may collect personal identification information from users in various ways, including but not limited to when users visit our app, register on the app, subscribe to newsletters, fill out forms, and in connection with other activities, services, features, or resources we make available.',
        },

        {
          id: 1,
          title: 'Non-personal Identification Information:',
          desc: 'We may collect non-personal identification information about users whenever they interact with our app. Non-personal identification information may include the type of device used, the operating system, the internet service providers utilized, and other similar information.',
        },
      ],
    },

    {
      id: 1,
      mainHeading: 'How We Use Collected Information',
      subHeading: [
        {
          id: 0,
          title: 'Personal Information:',
          desc: 'We may use personal information provided by users for the following purposes: To personalize user experience To improve our app To send periodic emails or notifications Non-personal Information: We may use non-personal information collected to understand how users interact with our app and to improve user experience.',
        },
      ],
    },

    {
      id: 2,
      mainHeading: 'Data Protection',
      desc: "We are committed to protecting the confidentiality of users' personal information. We employ industry-standard data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of users' personal information stored on our app.",
      subHeading: [],
    },

    {
      id: 3,
      mainHeading: 'Third-Party Services',
      desc: 'We may use third-party services and applications within our app. Users may be directed to third-party sites or services that are not controlled by us. Users should review the privacy policies of these third-party sites before providing any personal information.',
      subHeading: [],
    },
    {
      id: 4,
      mainHeading: 'Sharing Personal Information',
      desc: 'We do not sell, trade, or rent users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers.',
      subHeading: [],
    },
    {
      id: 5,
      mainHeading: 'Changes to This Privacy Policy',
      desc: '[Your Company/App Name] has the discretion to update this privacy policy at any time. Users are encouraged to frequently check this page for any changes to stay informed about how we are helping to protect the personal information collected. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.',
      subHeading: [],
    },

    {
      id: 6,
      mainHeading: 'Your Acceptance of These Terms',
      desc: 'By using this app, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our app. Your continued use of the app following the posting of changes to this policy will be deemed your acceptance of those changes.',
    },
  ];

  return (
    <WrapperContainer>
      <Header
        headingStyle={{ fontSize: RFValue(20), fontFamily: Font.semiBold }}
        title={'Privacy Policy'}
        navigation={navigation}
      />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <TextSmall textStyle={{ color: '#677282', marginTop: hp(1) }}>
          This Privacy Policy outlines how [Your Company/App Name] collects,
          uses, maintains, and discloses information gathered from users of the
          [Tyrone] mobile application ("App").
        </TextSmall>

        <FlatList
          scrollEnabled={false}
          data={data}
          contentContainerStyle={{ paddingBottom: hp(4) }}
          renderItem={({ item, index }) => (
            <View>
              <TextNormal style={{ marginTop: hp(1) }}>
                {item.mainHeading}
              </TextNormal>

              {item.subHeading?.map((i, ind) => (
                <View style={{ marginTop: hp(1) }} key={i?.id}>
                  <TextSmall>{i?.title}</TextSmall>

                  <TextSmaller
                    textStyle={{ color: '#677282', marginTop: hp(1) }}
                  >
                    {i?.desc}
                  </TextSmaller>
                </View>
              ))}

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

export default PrivacyPolicy;

const styles = StyleSheet.create({});
