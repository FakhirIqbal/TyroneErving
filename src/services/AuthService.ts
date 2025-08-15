import { useState } from 'react';
import { supabase } from '../config/supabase';
import { handleRPCPOST, showToast } from '../utils/helper';
import useUser from '../utils/useUser';
import { ScreenNames } from '../navigation/ScreenName';

const useAuth = () => {
  const { handleSetUser } = useUser();
  const [isloading, setIsLoading] = useState(false);
  const userSignup = async (userData: signupData, navigation: any) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: 'myapp://',
        },
      });
      if (authError) {
        return showToast('error', authError.message);
      }
      const { data: rpcData, error: rpcError } = await supabase.rpc('sign_up', {
        user_id: authData.user?.id,
        email: userData.email,
        password: userData.password,
        full_name: userData.fullName,
        phone_number: userData.phoneNumber,
        gender: userData.gender,
      });
      if (rpcData?.error) {
        return showToast('error', rpcData?.error);
      }
      if (rpcError) {
        return showToast('error', rpcError.message);
      }

      console.log('User created successfully:', rpcData);
      showToast('success', 'Account has been created successfully');
      navigation.navigate(ScreenNames.SIGNIN);
      return { authData, rpcData };
    } catch (error: any) {
      setIsLoading(false);
      console.log('Signup Catch error:', error);
      return showToast('error', error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const userLogin = async (data: loginData) => {
  //   setisloading(true);
  //   try {
  //     const rpcRes = await handleRPCPOST('login_user', {
  //       p_email: data.email,
  //       p_password: data.password,
  //     });

  //     if (rpcRes?.data?.status_code === 403) {
  //       const { success, error, message } = await generateOtp(data.email);
  //       if (success) {
  //         setisloading(false);
  //         return showToast('success', message);
  //       } else {
  //         setisloading(false);
  //         return showToast('error', error);
  //       }
  //     }
  //     if (rpcRes?.data?.status_code === 401) {
  //       setisloading(false);
  //       return showToast('error', rpcRes?.data?.error);
  //     }
  //     if (rpcRes?.data?.status_code === 404) {
  //       setisloading(false);
  //       return showToast('error', rpcRes?.data?.error);
  //     }
  //     console.log('OK', rpcRes);
  //     const { data: signinData, error: signinError } =
  //       await supabase.auth.signInWithPassword({
  //         email: data.email,
  //         password: data.password,
  //       });

  //     if (signinError) {
  //       setisloading(false);
  //       return showToast('error', signinError.message);
  //     }

  //     if (signinData?.session?.access_token) {
  //       const token = signinData.session.access_token;
  //       let data = {
  //         ...rpcRes?.data?.user,
  //         token: token,
  //       };
  //       handleSetUser(data);

  //       console.log('Rpc', data);
  //       setisloading(false);
  //       return showToast('success', 'Account login successfully');
  //     }
  //   } catch (error: any) {
  //     console.log('Catch Error in Login', error.message);
  //     setisloading(false);
  //     return showToast('error', error.message);
  //   } finally {
  //     setisloading(false);
  //   }
  // };
  const userLogin = async (data: loginData) => {
    setIsLoading(true);

    try {
      // Step 1: Attempt RPC login
      const rpcRes = await handleRPCPOST('login_user', {
        p_email: data.email,
        p_password: data.password,
      });

      // Handle specific RPC response status codes
      switch (rpcRes?.data?.status_code) {
        case 403: // OTP required
          const otpResponse = await generateOtp(data.email);
          setIsLoading(false);
          showToast(
            otpResponse.success ? 'success' : 'error',
            otpResponse.message || otpResponse.error,
          );
          return;

        case 401: // Unauthorized
        case 404: // Not found
          setIsLoading(false);
          showToast('error', rpcRes?.data?.error || 'Authentication failed');
          return;
      }

      // Step 2: If RPC succeeds, authenticate with Supabase
      const { data: signinData, error: signinError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (signinError) {
        showToast('error', signinError.message);
        return;
      }

      if (!signinData?.session?.access_token) {
        showToast('error', 'Authentication failed - no access token');
        return;
      }

      // Step 3: On successful authentication, handle user data
      const userData = {
        ...rpcRes?.data?.user,
        token: signinData.session.access_token,
      };

      handleSetUser(userData);
      showToast('success', 'Account logged in successfully');
    } catch (error: any) {
      console.error('Login error:', error);
      showToast(
        'error',
        error.message || 'An unexpected error occurred during login',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPass = async (email: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `yourapp://reset-password`,
    });

    if (data) {
      setIsLoading(false);
      console.log('Data is here ', data);
      showToast('info', 'email has been sent to your email');
    }
    if (error) {
      setIsLoading(false);
      showToast('error', error.message);
    }
  };

  const resetPass = async (data: any) => {
    try {
      const res = await handleRPCPOST('reset_pass', {
        p_email: data.email,
        p_password: data.password,
      });
      if (res?.data) {
        console.log('Reset Pass is working ', res);
        if (res.data.status_code === 201) {
          showToast('success', res.data.message);
        } else {
          showToast('error', res.data.error);
        }
      } else {
        showToast('error', res?.error.message);
      }
    } catch (error: any) {
      console.error('Reset error:', error);
      showToast('error', error.message);
    }
  };

  const generateOtp = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resend({
        email,
        type: 'signup',
      });

      return {
        success: !error,
        error: error?.message || null,
        message: 'Verification email sent to your registered address',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to send verification email',
      };
    }
  };
  return {
    userSignup,
    userLogin,
    forgotPass,
    resetPass,
    isloading,
  };
};

export default useAuth;
