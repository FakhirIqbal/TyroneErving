// import {
//   FlatList,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from 'react-native';

// import { COLORS } from '../../utils/theme';
// import Customimage from '../common/customImage';
// import { HorizontalCardListProps } from './interface';
// import React, { useCallback, useState } from 'react';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { RFValue } from 'react-native-responsive-fontsize';

// const HorizontalCardList: React.FC<HorizontalCardListProps> = ({ data }) => {
//   const [value, setValue] = useState('');
//   const renderItem = useCallback(
//     ({ item, index }: any) => {
//       const isSelected = value === item.name;
//       return (
//         <TouchableOpacity
//           onPress={() => {
//             setValue(item.name);
//           }}
//           style={[styles.card, isSelected && styles.selectedCard]}
//         >
//           <Customimage
//             source={item.image}
//             style={styles.image}
//             resizeMode="contain"
//           />
//           <Text
//             style={[
//               styles.name,
//               isSelected && { color: COLORS.orange, fontWeight: '600' },
//             ]}
//           >
//             {item.name}
//           </Text>
//         </TouchableOpacity>
//       );
//     },
//     [value, setValue],
//   );
//   return (
//     <FlatList
//       data={data}
//       horizontal={true}
//       showsHorizontalScrollIndicator={false}
//       keyExtractor={item => item.name}
//       renderItem={renderItem}
//     />
//   );
// };
// const styles = StyleSheet.create({
//   card: {
//     margin: wp(1),
//     alignItems: 'center',
//   },
//   image: {
//     width: wp(28),
//     height: hp(12),
//   },
//   name: {
//     fontWeight: '400',
//     fontSize: RFValue(11),
//   },
//   selectedCard: {
//     borderColor: COLORS.orange,
//     borderWidth: 2,
//     borderRadius: wp(2),
//   },
// });

// export const HorizontalSelection = React.memo(HorizontalCardList);

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import { COLORS } from '../../utils/theme';
import Customimage from '../common/customImage';
import { HorizontalCardListProps } from './interface';
import React, { memo, useCallback } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

interface ListItem {
  name: string;
  image: any;
}

const HorizontalCardList: React.FC<HorizontalCardListProps> = ({
  data,
  selectedValue,
  onSelect,
}) => {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ListItem>) => {
      const isSelected = selectedValue === item.name;

      return (
        <TouchableOpacity
          onPress={() => onSelect?.(item.name)}
          style={[styles.card, isSelected && styles.selectedCard]}
        >
          <Customimage
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
          <Text
            style={[styles.name, isSelected && styles.selectedText]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedValue, onSelect],
  );

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.name}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: wp(1),
    alignItems: 'center',
    padding: wp(1),
  },
  image: {
    width: wp(28),
    height: hp(12),
  },
  name: {
    fontWeight: '400',
    fontSize: RFValue(11),
    marginTop: hp(0.5),
    maxWidth: wp(28),
  },
  selectedCard: {
    borderColor: COLORS.orange,
    borderWidth: 2,
    borderRadius: wp(2),
  },
  selectedText: {
    color: COLORS.orange,
    fontWeight: '600',
  },
});

export const HorizontalSelection = memo(HorizontalCardList);
