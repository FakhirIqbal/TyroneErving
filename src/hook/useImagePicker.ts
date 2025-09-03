import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Image } from 'react-native-compressor';
type FormData = {
  media: { path: any; mime?: string; name?: string } | null;
};
interface MediaData {
  data?: any;
  height?: number;
  width?: number;
  filename?: string;
  mime: string;
  path: string;
  image: string;
  uri?: string;
  duration?: number;
  success: boolean;
  error: boolean;
  message?: string;
}
const useImagePicker = () => {
  const [localImageUriArray, setLocalImageUriArray] = useState<MediaData[]>([]);
  const { setValue, watch, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      media: null,
    },
  });

  const selectedMedia = watch('media');
  const maxFileSizeInBytes = 50 * 1024 * 1024;

  useEffect(() => {
    if (localImageUriArray) {
      console.log('Imagessss', localImageUriArray);
    }
  }, [localImageUriArray]);

  const openCamera = async ({ mediaType }: any) => {
    let config = {
      cropping: mediaType === 'video' || 'any' ? false : true,
      multiple: false,
      maxFiles: 1,
      mediaType: mediaType,
      includeBase64: true,
    };

    try {
      const res = await ImagePicker.openCamera(config);

      if (res?.size > maxFileSizeInBytes) {
        Alert.alert(
          'File Size Exceeded',
          'Please select a file with size less than 50MB',
          [
            {
              text: 'Ok',
              onPress: () => {},
            },
          ],
        );
        return;
      }

      const mediaData: MediaData = {
        data: res.data,
        height: res.height,
        width: res.width,
        filename: res.filename,
        mime: res.mime,
        path: res.path,
        image: res.path,
        success: true,
        error: false,
      };

      const compressedImage = await compressImageSize(mediaData);
      setLocalImageUriArray([compressedImage]);

      setValue('media', {
        path: res?.path || res.sourceURL,
        mime: res?.mime,
        name: res?.filename,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message !== 'User cancelled image selection') {
          Alert.alert('Error', 'Failed to take photo');
        }
      }
    }
  };

  const openGallery = async (mediaType: any) => {
    let config = {
      forceJpg: true,
      cropping: mediaType === 'video' || 'any' ? false : true,
      multiple: false,
      maxFiles: 1,
      mediaType: mediaType,
      includeBase64: true,
    };
    try {
      const res = await ImagePicker.openPicker(config);

      if (res?.size > maxFileSizeInBytes) {
        Alert.alert(
          'File Size Exceeded',
          'Please select a file with size less than 50MB',
          [
            {
              text: 'Ok',
              onPress: () => {},
            },
          ],
        );
        return;
      }

      const mediaData: MediaData = {
        data: res.data,
        height: res.height,
        width: res.width,
        filename: res.filename,
        mime: res.mime,
        path: res.path,
        image: res.path,
        success: true,
        error: false,
      };

      const compressedImage = await compressSingleImage([mediaData]);

      setLocalImageUriArray(compressedImage);

      if (res.mime.includes('video')) {
        return Alert.alert("'Video Found';");
      }
      setValue('media', {
        path: res?.path || res.sourceURL,
        mime: res?.mime,
        name: res?.filename,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message !== 'User cancelled image selection') {
          Alert.alert('Error', 'Failed to select image');
        }
      }
    }
  };

  const compressSingleImage = async (
    imageUrls: MediaData[],
  ): Promise<MediaData[]> => {
    const compressedImages: MediaData[] = [];
    await Promise.all(
      imageUrls.map(async imageUrl => {
        const compressedImage = await compressImageSize(imageUrl);
        compressedImages.push(compressedImage);
      }),
    );
    return compressedImages;
  };

  const compressImageSize = async (image: MediaData): Promise<MediaData> => {
    try {
      const { path, uri } = image;

      const result = await Image.compress(path || uri!, {
        quality: 0.8,
        compressionMethod: 'auto',
      });

      return {
        ...image,
        path: result,
      };
    } catch (error: any) {
      return {
        ...image,
        error: true,
        message: error?.message,
      };
    }
  };

  return {
    openCamera,
    openGallery,
    selectedMedia,
    localImageUriArray,
    setLocalImageUriArray,
  };
};

export default useImagePicker;
