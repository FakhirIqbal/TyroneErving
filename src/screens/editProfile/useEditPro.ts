import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useImagePicker from '../../hook/useImagePicker';
import useUser from '../../utils/useUser';
import { PhoneNumberValue } from '../../components/common/customPhoneinput/interface';
import { handleRPCPOST, showToast } from '../../utils/helper';
import { imageServices } from '../../services/ImageServices';

type Media = {
  path: string;
  mime?: string;
  name?: string;
};

type FormData = {
  profileImage: Media | null;
  Name: string;
  phoneNumber: PhoneNumberValue;
};

const EditProHook = () => {
  const { openGallery, openCamera, selectedMedia, localImageUriArray } =
    useImagePicker();
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  const { uploadImage } = imageServices();

  const initialData: any = {
    Name: user?.data?.name,

    phoneNumber: {
      formatted_number: user?.data?.formatted_number,
      national_number: user?.data?.national_number,
      country_code: user?.data?.country_code,
      is_valid: true,
    },
    profileImage: user?.data?.profile_image,
  };

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: initialData,
  });
  const { Name, phoneNumber, profileImage } = watch();
  useEffect(() => {
    if (selectedMedia) {
      setValue('profileImage', selectedMedia);
      trigger('profileImage');
    }
  }, [selectedMedia, setValue, trigger]);

  const onSelect = () => {
    Alert.alert(
      'Choose an option',
      'Select media from:',
      [
        {
          text: 'Gallery',
          onPress: () => openGallery('photo'),
          style: 'default',
        },
        {
          text: 'Camera',
          onPress: () => openCamera('photo'),
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const onEdit = React.useCallback(
    async (data: FormData, navigation: any) => {
      const hasChanges =
        data.Name !== initialData.Name ||
        data.phoneNumber?.formatted_number !==
          initialData.phoneNumber?.formatted_number ||
        data.profileImage !== initialData.profileImage;

      if (!hasChanges) {
        Alert.alert(
          'No changes detected',
          'Please modify at least one field to update your profile',
        );
        return;
      }

      setloading(true);
      const res = await uploadImage(localImageUriArray[0], user.data?.id);

      if (!res?.success) {
        showToast('error', res?.error);
        setloading(false);
        return;
      }
      let payload = {
        user_id: user.data?.id,
        user_name: data.Name,
        country_cod: data.phoneNumber.country_code,
        national_numbr: data.phoneNumber.national_number,
        formatted_numbr: data.phoneNumber.formatted_number,
        profileimage: res.data,
      };
      const response = await handleRPCPOST('edit_profile', payload);

      if (response?.success) {
        console.log('Success', response.data);
        showToast('success', 'Profile updated successfully');
        setloading(false);
        navigation.goBack();
      } else {
        showToast('error', response?.error);
        console.log('Error', response?.error);
        setloading(false);
      }
    },
    [initialData],
  );
  return {
    onSelect,
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    Name,
    phoneNumber,
    profileImage,
    errors,
    onEdit,
    trigger,
    initialData,
    loading,
  };
};

export default EditProHook;
