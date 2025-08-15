import React from 'react';
import RatingStars from '../../components/ratingStars';
import Customimage from '../../components/common/customImage';
import CustomButton from '../../components/common/customButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import WrapperContainer from '../../components/common/customWrapper';

import { COLORS } from '../../utils/theme';
import { ScreenNames } from '../../navigation/ScreenName';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScrollView, View, StyleSheet } from 'react-native';
import { TextBig, TextSmall, TextSmaller } from '../../components/common/customText';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const OrderConfirmation = ({ navigation }: any) => {

    const handleSubmit = () => {
        navigation.navigate(ScreenNames.BOTTOM_STACK);
    };

    return (
        <WrapperContainer>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ marginTop: hp(3), alignItems: 'center' }}>
                        <Customimage
                            source={require('../../assets/done.png')}
                            style={{ height: hp(10), width: hp(10), marginBottom: hp(2) }}
                        />
                        <TextBig>Thank you for your order</TextBig>
                        <TextSmaller style={styles.successText}>
                            your order has been successfully
                        </TextSmaller>

                        <View style={styles.card}>

                            <View style={styles.cardTop}>
                                <TextSmall style={styles.cardTitle}>Order Details</TextSmall>
                                <TextSmall style={{}} >Order Id: 14767</TextSmall>
                            </View>

                            <View style={[styles.rowBetween, { marginVertical: hp(1.5), alignItems: 'center' }]}>
                                <Customimage
                                    source={require('../../assets/cardImage/shades.png')}
                                    style={styles.image}
                                />
                                <View style={{ flex: 1, marginLeft: wp(3) }}>
                                    <TextSmall style={{}}>OH-12</TextSmall>
                                    <TextSmall style={{ marginTop: hp(1) }}>Size: M</TextSmall>
                                </View>
                                <View>
                                    <TextSmall style={styles.price}>$2,495.00</TextSmall>
                                    <RatingStars value={3} style={{ marginTop: hp(1) }} />
                                </View>
                            </View>

                            <View style={styles.cardBottom}>
                                <View style={styles.rowStart} >
                                    <FontAwesome name="credit-card" size={16} color={COLORS.orange} />
                                    <TextSmall style={{}}> Credit Card </TextSmall>
                                </View>
                                <TextSmall style={{ fontSize: wp(3.5), marginTop: hp(1) }} >Transaction ID: XXXXXXXXXX</TextSmall>
                            </View>
                        </View>
                    </View>

                    <CustomButton title="Back To Home" onPress={handleSubmit} style={{ marginBottom: hp(4) }} />
                </View>
            </ScrollView>
        </WrapperContainer>
    );
};

export default OrderConfirmation;

const styles = StyleSheet.create({
    successText: {
        fontWeight: '400',
        color: COLORS.textGray,
        marginTop: hp(0.5),
    },
    card: {
        marginTop: hp(4),
        borderRadius: wp(3),
        backgroundColor: COLORS.gray,
        padding: wp(4),
        width: wp(90),
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardTop: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingBottom: wp(3),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.darkGray,
    },
    rowStart: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(1),
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.black,
    },
    image: {
        width: wp(18),
        height: wp(18),
        resizeMode: 'cover',
    },
    price: {
        fontWeight: 'bold',
        color: COLORS.black,
        fontSize: RFValue(12),
    },
    cardBottom: {
        borderTopWidth: 1,
        flexDirection: 'row',
        paddingTop: wp(2),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopColor: COLORS.darkGray,
    }
});