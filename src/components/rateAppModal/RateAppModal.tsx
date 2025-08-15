import React from 'react';
import { useState } from 'react';
import { COLORS } from '../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Customimage from '../common/customImage';


const RateAppModal = () => {
    const [visible, setVisible] = useState(true);
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        console.log('Rated:', rating);
        setVisible(false);
    };

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Customimage
                        source={require('../../assets/thumbsUp.png')}
                        style={styles.image}
                    />
                    <Text style={styles.modalTitle}>Rate Our App</Text>
                    <Text style={styles.modalText}>
                        If you enjoy using this app, would you mind taking a moment to rate it?
                        Thanks for your support!
                    </Text>

                    <View style={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                            <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
                                <FontAwesome
                                    name="star"
                                    size={RFValue(22)}
                                    color={i < rating ? COLORS.yellow : COLORS.gray}
                                    style={{ marginHorizontal: wp(1) }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.laterBtn} onPress={handleClose}>
                            <Text style={styles.laterText}>Maybe later</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalContainer: {
        width: wp(85),
        padding: wp(6),
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    modalTitle: {
        fontWeight: 'bold',
        marginBottom: hp(1),
        fontSize: RFValue(17),
        color: COLORS.primaryText,
    },
    modalText: {
        textAlign: 'center',
        marginBottom: hp(2),
        fontSize: RFValue(12),
        color: COLORS.secondaryText,
    },
    image: {
        width: wp(18),
        height: hp(8.2),
        borderRadius: wp(10),
        marginBottom: hp(2),
        backgroundColor: COLORS.gray,
        padding: wp(3),
    },
    stars: {
        flexDirection: 'row',
        marginBottom: hp(2),
    },
    modalButtons: {
        width: '100%',
        marginTop: hp(1.5),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    laterBtn: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        marginRight: wp(2),
        alignItems: 'center',
        paddingVertical: hp(1.2),
        borderColor: COLORS.gray,
    },
    laterText: {
        fontSize: RFValue(12),
        textAlign: 'center',
        color: COLORS.primaryText,
    },
    submitBtn: {
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: hp(1.2),
        backgroundColor: COLORS.orange,
    },
    submitText: {
        fontWeight: '600',
        textAlign: 'center',
        color: COLORS.white,
        fontSize: RFValue(12),
    },
});

export default RateAppModal;