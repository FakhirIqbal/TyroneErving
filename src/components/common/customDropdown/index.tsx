
import { COLORS } from '../../../utils/theme';
import { CustomDropdownProps } from './interface';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TextNormal } from '../customText';


const CustomDropdown: React.FC<CustomDropdownProps> = ({
    label,
    placeholder,
    options,
    value,
    onChange,
    error,
    style
}) => {

    return (
        <View style={[styles.container, style]}>

            {label && <TextNormal textStyle={styles.label}>{label}</TextNormal>}

            <Dropdown
                style={[
                    styles.dropdown,
                    error && styles.errorBorder,
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={options}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={value}
                onChange={item => {
                    onChange(item.value);
                }}
            />

            {error && <TextNormal textStyle={styles.errorText}>{error}</TextNormal>}
        </View>
    );
};

export default CustomDropdown;

const styles = StyleSheet.create({
    container: {
        marginBottom: hp(1.5),
    },
    label: {
        fontWeight: '500',
        color: COLORS.black,
        marginBottom: hp(1),
        fontSize: RFValue(12),
    },
    dropdown: {
        borderWidth: wp(0.3),
        height: hp(5.5),
        borderRadius: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        borderColor: COLORS.gray,
        backgroundColor: COLORS.white,
    },
    errorBorder: {
        borderColor: COLORS.error,
    },
    placeholderStyle: {
        fontSize: RFValue(10),
        color: COLORS.darkGray,
    },
    selectedTextStyle: {
        fontSize: RFValue(10),
        color: COLORS.black,
    },
    errorText: {
        marginTop: hp(0.5),
        color: COLORS.error,
        fontSize: RFValue(10),
    },
});
