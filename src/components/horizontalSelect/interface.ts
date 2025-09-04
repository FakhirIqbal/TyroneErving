import { ImageSourcePropType } from 'react-native';

export type HorizontalCardListProps = {
  item: any;
  index: any;
  selected: string | any;
  onPress: () => void;
};
type CardItem = {
  name: string;
  image: ImageSourcePropType;
};
