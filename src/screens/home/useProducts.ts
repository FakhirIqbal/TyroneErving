import React, { useEffect, useState, useRef, useCallback } from 'react';
import { handleRPCPOST, showToast } from '../../utils/helper';
import useDebounce from '../../hook/useDebounce';

const useProducts = (filter: string, pageSize = 10) => {
  const [search, setSearch] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [offset, setOffset] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState({
    isLoadmore: false,
    isRefresh: false,
  });

  const debouncedValue = useDebounce(search, 300);
  const isRequestInProgress = useRef(false);
  const requestIdRef = useRef(0);

  const getAll = useCallback(
    async (isRefresh: boolean) => {
      if (isRequestInProgress.current) return;
      if (
        !isRefresh &&
        (!hasMorePages || isLoading.isLoadmore || isLoading.isRefresh)
      )
        return;

      const currentOffset = isRefresh ? 0 : offset;
      requestIdRef.current += 1;
      const currentRequestId = requestIdRef.current;

      isRequestInProgress.current = true;
      setIsLoading({ isRefresh, isLoadmore: !isRefresh });

      try {
        const res = await handleRPCPOST('get_all_glasses', {
          _limit: pageSize,
          _offset: currentOffset,
          _filter: filter,
          _search: debouncedValue,
        });
        console.log('Ressss', res);
        if (requestIdRef.current !== currentRequestId) return;

        if (res?.error) {
          showToast('error', res?.error);
          setError(true);
          return;
        }

        setHasMorePages(res?.data?.pagination?.has_more);
        const newProducts = res?.data?.glasses || [];

        if (isRefresh) {
          setAllProducts(newProducts);
          setOffset(pageSize);
        } else {
          setAllProducts(prev => [...prev, ...newProducts]);
          setOffset(currentOffset + pageSize);
        }
      } catch (err: any) {
        console.log('Catch Error', err);
        showToast('error', err?.message);
        setError(true);
      } finally {
        setInitialLoading(false);
        setIsLoading({ isLoadmore: false, isRefresh: false });
        isRequestInProgress.current = false;
      }
    },
    [filter, debouncedValue, offset, hasMorePages, isLoading, pageSize],
  );

  useEffect(() => {
    getAll(true);
  }, [filter, debouncedValue]);

  return {
    allProducts,
    initialLoading,
    isLoadmore: () => getAll(false),
    refetchProduct: () => {
      setSearch(''), getAll(true);
    },
    isLoading,
    hasMorePages,
    error,
    setSearch,
    search,
  };
};

export default useProducts;