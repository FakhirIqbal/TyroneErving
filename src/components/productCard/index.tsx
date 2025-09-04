// import { COLORS } from '../../utils/theme';
// import { ProductCardProps } from './interface';
// import { useNavigation } from '@react-navigation/native';
// import { RFValue } from 'react-native-responsive-fontsize';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Pressable,
//   ImageBackground,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Customimage from '../common/customImage';
// import React from 'react';

// const ProductCard: React.FC<ProductCardProps> = ({
//   item,
//   favOnpress,
//   crtOnpress,
// }) => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={require('../../assets/cardImage/bgCard.png')}
//         style={styles.bgImage}
//         resizeMode="cover"
//       >
//         <Pressable
//           onPress={() => navigation.navigate('ProductDetail' as never)}
//           style={styles.pressableContainer}
//         >
//           <Customimage
//             source={{ uri: item?.colors[0]?.images[0] }}
//             style={styles.productImage}
//             resizeMode="cover"
//           />

//           <View style={styles.textContainer}>
//             <Text
//               style={styles.productName}
//               numberOfLines={1}
//               ellipsizeMode="tail"
//             >
//               {item?.name}
//             </Text>
//             <Text style={styles.productPrice}>
//               ${item?.base_price?.toFixed(2)}
//             </Text>
//           </View>
//         </Pressable>
//         <View style={styles.actions}>
//           <TouchableOpacity
//             onPress={favOnpress}
//             style={[
//               styles.iconButton,
//               { backgroundColor: item.fav ? COLORS.orange : COLORS.black },
//             ]}
//           >
//             <Icon
//               name={item.fav ? 'heart' : 'heart-outline'}
//               size={wp(4.5)}
//               color={COLORS.white}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={crtOnpress} style={styles.iconButton}>
//             <Icon name="cart-outline" size={wp(4.5)} color={COLORS.white} />
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// export default React.memo(ProductCard);

// const styles = StyleSheet.create({
//   container: {
//     width: '45%',
//     alignItems: 'center',
//     marginHorizontal: wp(2),
//     marginVertical: hp(1),
//   },
//   bgImage: {
//     width: '100%',
//     aspectRatio: 0.8,

//     borderRadius: wp(4),
//   },
//   pressableContainer: {
//     flex: 1,
//     padding: wp(3),
//   },
//   productImage: {
//     width: '100%',
//     height: hp(10),
//     borderRadius: wp(3),
//   },
//   textContainer: {
//     marginVertical: hp(1),
//     paddingHorizontal: wp(1),
//   },
//   productName: {
//     fontSize: RFValue(12),
//     fontWeight: '600',
//     color: COLORS.black,
//     marginBottom: hp(0.5),
//     textAlign: 'center',
//   },
//   productPrice: {
//     fontSize: RFValue(12),
//     fontWeight: '700',
//     color: COLORS.black,
//     textAlign: 'center',
//   },
//   actions: {
//     position: 'absolute',
//     bottom: -10,
//     alignSelf: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: wp(4),
//     marginTop: hp(1),
//   },
//   iconButton: {
//     backgroundColor: COLORS.black,
//     borderRadius: wp(50),
//     padding: wp(3),
//     aspectRatio: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
import { COLORS } from '../../utils/theme';
import { ProductCardProps } from './interface';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Customimage from '../common/customImage';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  favOnpress,
  crtOnpress,
  isLoading = false,
  navigation,
}) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <SkeletonPlaceholder
          speed={1200}
          highlightColor="#f5f5f5"
          backgroundColor="#e0e0e0"
        >
          <View style={styles.skeletonCard} />
        </SkeletonPlaceholder>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/cardImage/bgCard.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <Pressable
          onPress={() => navigation.navigate('ProductDetail', { data: item })}
          style={styles.pressableContainer}
        >
          <Customimage
            source={{ uri: item?.colors[0]?.images[0] }}
            style={styles.productImage}
            resizeMode="cover"
          />

          <View style={styles.textContainer}>
            <Text
              style={styles.productName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item?.name}
            </Text>
            <Text style={styles.productPrice}>
              ${item?.base_price?.toFixed(2)}
            </Text>
          </View>
        </Pressable>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={favOnpress}
            style={[
              styles.iconButton,
              { backgroundColor: item.fav ? COLORS.orange : COLORS.black },
            ]}
          >
            <Icon
              name={item.fav ? 'heart' : 'heart-outline'}
              // name={'heart-outline'}
              size={wp(4.5)}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={crtOnpress} style={styles.iconButton}>
            <Icon name="cart-outline" size={wp(4.5)} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default React.memo(ProductCard);

const styles = StyleSheet.create({
  container: {
    width: '45%',
    alignItems: 'center',
    marginHorizontal: wp(2),
    marginVertical: hp(1),
  },
  bgImage: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: wp(4),
  },
  pressableContainer: {
    flex: 1,
    padding: wp(3),
  },
  productImage: {
    width: '100%',
    height: hp(10),
    borderRadius: wp(3),
  },
  textContainer: {
    marginVertical: hp(1),
    paddingHorizontal: wp(1),
  },
  productName: {
    fontSize: RFValue(12),
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: hp(0.5),
    textAlign: 'center',
  },
  productPrice: {
    fontSize: RFValue(12),
    fontWeight: '700',
    color: COLORS.black,
    textAlign: 'center',
  },
  actions: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp(4),
    marginTop: hp(1),
  },
  iconButton: {
    backgroundColor: COLORS.black,
    borderRadius: wp(50),
    padding: wp(3),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Skeleton styles
  skeletonCard: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: wp(4),
    padding: wp(3),
  },
  skeletonImage: {
    width: '100%',
    height: hp(10),
    borderRadius: wp(3),
    marginBottom: hp(1),
  },
  skeletonText: {
    height: hp(1.8),
    borderRadius: wp(1),
    marginBottom: hp(0.5),
    width: '80%',
  },
  skeletonButton: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(50),
  },
});
