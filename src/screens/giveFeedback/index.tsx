
import React from 'react';
import Header from '../../components/common/Header';
import CustomButton from '../../components/common/customButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import WrapperContainer from '../../components/common/customWrapper';

import { useState } from 'react';
import { COLORS } from '../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextSmall, TextBig } from '../../components/common/customText';
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const GiveFeedback = ({ navigation }: any) => {

  const [rating, setRating] = useState(1);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    const feedbackData = { rating, feedback };
    // console.log('Submitted Feedback:', feedbackData);
    navigation.goBack();
  };

  return (
    <WrapperContainer>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Give Feedback" navigation={navigation} />

        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ marginTop: hp(3) }}>
            <TextBig>How did we do?</TextBig>

            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
                  <FontAwesome
                    name="star"
                    size={RFValue(24)}
                    color={i < rating ? COLORS.yellow : COLORS.gray}
                    style={{ marginHorizontal: wp(1) }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View
              style={{
                borderWidth: 0.5,
                borderColor: COLORS.darkGray,
                marginBottom: hp(2),
              }}
            />

            <TextSmall textStyle={{ fontWeight: '300', marginBottom: hp(1) }}>Care to share more about it?</TextSmall>
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.secondaryText}
              placeholder="Optional..."
              multiline
              value={feedback}
              onChangeText={setFeedback}
            />
            <TextSmall textStyle={{ color: COLORS.secondaryText }}>
              Your review will be posted to the Google Play Store.
            </TextSmall>
          </View>

          <CustomButton
            title="Submit"
            onPress={handleSubmit}
            style={{ marginBottom: hp(4) }}
          />

        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  stars: {
    flexDirection: 'row',
    marginVertical: hp(2),
  },
  input: {
    borderWidth: 1,
    padding: wp(4),
    height: hp(32),
    borderRadius: 12,
    marginBottom: hp(3),
    fontSize: RFValue(12),
    textAlignVertical: 'top',
    borderColor: COLORS.gray,
    color: COLORS.primaryText,
    backgroundColor: COLORS.white,
  },
});

export default GiveFeedback;