import { COLORS } from '../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
    value: number;
    onChange: (value: number) => void;
}

const QuantitySelector: React.FC<Props> = ({ value, onChange }) => {

    const increment = () => onChange(value + 1);
    const decrement = () => onChange(value > 1 ? value - 1 : 1);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.textLightGray }]} onPress={decrement}>
                <Icon name="remove" size={18} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.value}>{value}</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.orange }]} onPress={increment}>
                <Icon name="add" size={18} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default QuantitySelector;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
    },
    button: {
        width: wp(5.2),
        height: hp(2.5),
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    value: {
        fontWeight: '500',
        fontSize: RFValue(12),
    },
});