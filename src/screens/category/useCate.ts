import { useEffect, useState, useRef, useCallback } from 'react';
import { handleRPCPOST, showToast } from '../../utils/helper';
import useDebounce from '../../hook/useDebounce';

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

  const frame_typeeDebounce = useDebounce(frame_typee, 1000);
  const frameMaterialDebounce = useDebounce(frame_materiall, 1000);
  const lensDebounce = useDebounce(lens_typee, 1000);
  const priceDebounce = useDebounce(price, 1000);

  const isRequestInProgress = useRef(false);
  const requestIdRef = useRef(0);
  console.log('first', {
    frameMaterialDebounce,
    frame_typeeDebounce,
    lensDebounce,
    priceDebounce,
  });
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
          _frame_type: frame_typeeDebounce,
          _frame_material: frameMaterialDebounce,
          _lens_type: lensDebounce,
          _price_range: priceDebounce,
          _limit: pageSize,
          _offset: currentOffset,
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
    [
      offset,
      hasMorePages,
      isLoading,
      pageSize,
      frameMaterialDebounce,
      priceDebounce,
      lensDebounce,
      frame_typeeDebounce,
    ],
  );

  useEffect(() => {
    getAll(true);
  }, [frameMaterialDebounce, priceDebounce, lensDebounce, frame_typeeDebounce]);

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
