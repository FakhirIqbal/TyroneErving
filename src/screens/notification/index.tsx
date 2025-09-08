
import React from 'react';
import Header from '../../components/common/Header';
import WrapperContainer from '../../components/common/customWrapper';
import CustomNotification from '../../components/customNotification';

import { ImagePath } from '../../utils/ImagePath';
import { FlatList, StyleSheet } from 'react-native';
import { TextNormal } from '../../components/common/customText';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Notification = ({ navigation }: any) => {
  const data = [
    {
      id: 0,
      day: 'Today',
      Noti: [
        {
          id: 0,
          profileImag: ImagePath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 1,
          profileImag: ImagePath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 2,
          profileImag: ImagePath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 3,
          profileImag: ImagePath.trainer1,
          name: 'Alex Mercer',
          element: 'Elemesadsadsadsadsadsadsadsadasdasnt',
          createdAt: '24 april 2021',
        },
      ],
    },
    {
      id: 1,
      day: 'Yesterday',
      Noti: [
        {
          id: 0,
          profileImag: ImagePath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 1,
          profileImag: ImagePath.trainer1,
          name: 'Alex Mercer',
          element: 'Elemesadsadsadsadsadsadsadsadasdasnt',
          createdAt: '24 april 2021',
        },
        {
          id: 2,
          profileImag: ImagePath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 3,
          profileImag: ImagePath.trainer1,
          name: 'Alex Mercer',
          element: 'Elemesadsadsadsadsadsadsadsadasdasnt',
          createdAt: '24 april 2021',
        },
        {
          id: 4,
          profileImag: ImagePath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 5,
          profileImag: ImagePath.trainer1,
          name: 'Alex Mercer',
          element: 'Elemesadsadsadsadsadsadsadsadasdasnt',
          createdAt: '24 april 2021',
        },
        {
          id: 6,
          profileImag: ImagePath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 7,
          profileImag: ImagePath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
      ],
    },
  ];
  return (
    <WrapperContainer>
      <Header title='Notification' navigation={navigation} />

      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <TextNormal textStyle={{ alignSelf: 'center', marginTop: hp(2) }}>
            No Data Found
          </TextNormal>
        )}
        contentContainerStyle={{ paddingBottom: hp(4) }}
        data={data}
        renderItem={({ item, index }) => (
          <CustomNotification item={item} index={index} />
        )}
      />
    </WrapperContainer>
  );
};

export default Notification;

const styles = StyleSheet.create({});