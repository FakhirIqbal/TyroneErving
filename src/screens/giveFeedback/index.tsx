import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { COLORS } from '../../utils/theme';
import CustomHeader from '../../components/common/customHeader';
import CustomButton from '../../components/common/customButton';
import Header from '../../components/common/Header';
import WrapperContainer from '../../components/common/customWrapper';

const GiveFeedback = ({ navigation }: any) => {
  const [rating, setRating] = useState(1);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    const feedbackData = {
      rating,
      feedback,
    };
    console.log('Submitted Feedback:', feedbackData);
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
            <Text style={styles.subtitle}>How did we do?</Text>

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

            <Text style={styles.prompt}>Care to share more about it?</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.secondaryText}
              placeholder="Optional..."
              multiline
              value={feedback}
              onChangeText={setFeedback}
            />
            <Text
              style={{ color: COLORS.secondaryText, fontSize: RFValue(12) }}
            >
              Your review will be posted to the Google Play Store.
            </Text>
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
  subtitle: {
    fontWeight: '600',
    fontSize: RFValue(16),
    color: COLORS.primaryText,
  },
  stars: {
    flexDirection: 'row',
    marginVertical: hp(2),
  },
  prompt: {
    fontSize: RFValue(13),
    marginBottom: hp(1.5),
    color: COLORS.primaryText,
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
