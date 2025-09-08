import { useEffect, useState, useRef, useCallback } from 'react';
import { handleRPCPOST, showToast } from '../../utils/helper';

const useCate = (
  price: any,
  frame_typee: string | null,
  frame_materiall: string | null,
  lens_typee: string | null,
  pageSize = 10,
) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [offset, setOffset] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState({
    isLoadmore: false,
    isRefresh: false,
  });

  //   const debouncedValue = useDebounce(search, 300);
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
        const res = await handleRPCPOST('get_glasses_filter', {
          _limit: pageSize,
          _offset: currentOffset,
          _frame_type: frame_typee,
          _frame_material: frame_materiall,
          _lens_type: lens_typee,
          _price_range: price,
        });
        console.log('Res', res);

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
    [offset, hasMorePages, isLoading, pageSize],
  );

  useEffect(() => {
    getAll(true);
  }, [price]);

  return {
    allProducts,
    initialLoading,
    isLoadmore: () => getAll(false),
    refetchProduct: () => {
      getAll(true);
    },
    isLoading,
    hasMorePages,
    error,
  };
};

export default useCate;
