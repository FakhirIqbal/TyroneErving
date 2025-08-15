import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';
import { handleRPCPOST } from '../../utils/helper';

const useProducts = () => {
  const [initialLoading, setinitialLoading] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [allProducts, setallProducts] = useState<any[]>([]);
  const [isLoading, setisLoading] = useState({
    isLoadmore: false,
    isRefresh: false,
  });
  useEffect(() => {
    getAll(true, 0);
  }, []);

  const getAll = async (isRefresh: any, isLoadmore: any) => {
    setinitialLoading(true);

    if (
      isLoading.isRefresh ||
      isLoading.isLoadmore ||
      (!isRefresh && !isLoadmore)
    ) {
      return;
    }
    setisLoading({
      isRefresh: isRefresh,
      isLoadmore: !isRefresh,
    });
    try {
      const res = await handleRPCPOST('get_all_glasses', {});
      if (res?.data) {
        setallProducts(res?.data);
        console.log('All Products====>', res);
      }
      if (res?.error) {
        console.log('Errorrr imn ', res.error);
      }
    } catch (error) {
      console.log('Catch Eerrrrr', error);
    } finally {
      setinitialLoading(false);
    }
  };

  // const trnding = async () => {
  //   setinitialLoading(true);
  //   // if (
  //   //   isLoading.isRefresh ||
  //   //   isLoading.isLoadmore ||
  //   //   (!isRefresh && !hasMorePages)
  //   // ) {
  //   //   return;
  //   // }
  //   // setisLoading({
  //   //   isRefresh: isRefresh,
  //   //   isLoadmore: !isRefresh,
  //   // });
  //   try {
  //     const res = await handleRPCPOST('get_trending_glasses', {
  //       p_limit: 10,
  //       p_offset: 0,
  //     });

  //     if (res?.data) {
  //       setallProducts(res?.data?.data);
  //       console.log('Res in New Arrival', res?.data?.data);
  //     }
  //     if (res?.error) {
  //       console.log('Errorrr imn ', res.error);
  //     }
  //   } catch (error) {
  //     console.log('Catch Error', error);
  //   }
  // };

  return {
    getAll,
    allProducts,
    initialLoading,
  };
};

export default useProducts;
