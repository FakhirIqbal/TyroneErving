import React, { useEffect, useState, useRef } from 'react';
import { handleRPCPOST, showToast } from '../../utils/helper';
const useProducts = (filter: string) => {
  const [initialLoading, setinitialLoading] = useState(true);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [offset, setoffset] = useState<number>(0);
  const [error, seterror] = useState<boolean>(false);
  const [allProducts, setallProducts] = useState<any[]>([]);
  const [isLoading, setisLoading] = useState({
    isLoadmore: false,
    isRefresh: false,
  });

  const isRequestInProgress = useRef(false);

  useEffect(() => {
    refetchProduct();
  }, [filter]);

  const getAll = async (isRefresh: boolean) => {
    if (isRequestInProgress.current) return;
    if (
      !isRefresh &&
      (!hasMorePages || isLoading.isLoadmore || isLoading.isRefresh)
    ) {
      return;
    }

    const currentOffset = isRefresh ? 0 : offset;

    isRequestInProgress.current = true;
    setisLoading({
      isRefresh: isRefresh,
      isLoadmore: !isRefresh,
    });

    try {
      const res = await handleRPCPOST('get_all_glasses', {
        _limit: 10,
        _offset: currentOffset,
        _filter: filter,
      });

      if (res?.error) {
        showToast('error', res?.error);
        seterror(true);
        return;
      }

      setHasMorePages(res?.data?.pagination?.has_more);

      if (isRefresh) {
        setallProducts(res?.data?.glasses || []);
        setoffset(10);
      } else {
        setallProducts(prev => [...prev, ...(res?.data?.glasses || [])]);
        setoffset(currentOffset + 10);
      }
    } catch (error: any) {
      console.log('Catch Error', error);
      showToast('error', error?.message);
      seterror(true);
    } finally {
      setinitialLoading(false);
      setisLoading({ isLoadmore: false, isRefresh: false });
      isRequestInProgress.current = false;
    }
  };

  const isLoadmore = () => {
    if (hasMorePages && !isLoading.isLoadmore && !isLoading.isRefresh) {
      getAll(false);
    }
  };

  const refetchProduct = () => {
    if (!isLoading.isRefresh) {
      getAll(true);
    }
  };

  return {
    allProducts,
    initialLoading,
    isLoadmore,
    refetchProduct,
    isLoading,
    hasMorePages,
    error,
  };
};

export default useProducts;
