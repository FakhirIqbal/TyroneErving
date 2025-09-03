import { supabase } from '../config/supabase';
import useImagePicker from '../hook/useImagePicker';
import { handleRPCPOST, showToast } from '../utils/helper';
import { decode } from 'base64-arraybuffer';

export const imageServices = () => {
  const checkProfile = async (userId: any) => {
    const res = await handleRPCPOST('get_user_info', {
      user_id: userId,
    });

    return {
      data: res?.data?.profile_image,
      success: res?.data?.profile_image != null,
    };
  };

  const deleteExistingImage = async (filePath: string) => {
    const { error, data } = await supabase.storage
      .from('profile_images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting existing image:', error);
      return { success: false, error };
    }
    console.log('Data Deleted', data);

    return { success: true };
  };

  const uploadImage = async (file: any, user_id: any) => {
    try {
      const fileExtension = file?.path?.split('.')?.pop();
      const fileName = `${user_id}/${Date.now()}.${fileExtension}`;
      const filePath = fileName;

      const { data: imageUrl, success } = await checkProfile(user_id);

      if (success) {
        const result = imageUrl.split('/').pop();
        const pathforImage = `${user_id}/${result}`;
        const del = await deleteExistingImage(pathforImage);
        if (!del.success) {
          console.log('Failed to delete existing profile image:', del?.error);
        }
      }
      const { error } = await supabase.storage
        .from('profile_images')
        .upload(filePath, decode(file?.data), {
          contentType: `image/${fileExtension}`,
          upsert: true,
        });

      if (error) {
        return { success: false, error: error.message, data: null };
      }
      const data = supabase.storage
        .from('profile_images')
        .getPublicUrl(filePath);

      return {
        success: true,
        data: data.data.publicUrl,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error uploading profile picture',
        data: null,
      };
    }
  };

  return {
    uploadImage,
  };
};
