import Toast from 'react-native-toast-message';
import { supabase } from '../config/supabase';

export const handleRPCPOST = async (reqString: string, reqFunction?: any) => {
  try {
    const { data, error } = await supabase.rpc(reqString, reqFunction);

    if (data) {
      return {
        success: true,
        data: data,
      };
    }
    if (error) {
      return {
        success: false,
        error: error?.message,
      };
    }
  } catch (error: any) {
    console.log('REQUEST HANDLER ERROR CATCH', error);
    return {
      error: error?.message,
      success: false,
    };
  }
};
export function showToast(type: string, message: string | any) {
  let temp = type.charAt(0).toUpperCase() + type.slice(1);
  try {
    Toast.show({
      type: type || 'info',
      text1: temp,
      text2: message + '👋',
    });
  } catch (error) {
    console.log(error);
  }
}
