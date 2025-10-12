import { useEffect, useRef } from 'react';

/**
 * 무한 스크롤 훅 (가로/세로 대응)
 * @param {Object} options
 * @param {React.RefObject} options.targetRef - 관찰할 DOM ref (마지막 요소)
 * @param {React.RefObject} [options.rootRef] - 스크롤 컨테이너 ref (기본값: viewport)
 * @param {boolean} options.hasNext - 다음 데이터 존재 여부
 * @param {boolean} options.loading - 첫 로딩 여부
 * @param {boolean} options.isFetching - 추가 로딩 여부
 * @param {Function} options.fetchMore - 다음 데이터를 불러올 함수
 */
const useInfiniteScroll = ({
  targetRef,
  rootRef = null,
  hasNext,
  loading,
  isFetching,
  fetchMore,
}) => {
  const latest = useRef({ hasNext, loading, isFetching, fetchMore });

  useEffect(() => {
    latest.current = { hasNext, loading, isFetching, fetchMore };
  }, [hasNext, loading, isFetching, fetchMore]);

  useEffect(() => {
    if (latest.current.loading) {
      return;
    }

    const target = targetRef.current;

    if (!target) {
      return;
    }

    const { hasNext, isFetching } = latest.current;

    const rect = target.getBoundingClientRect();
    const rootHeight = rootRef?.current?.clientHeight || window.innerHeight;
    if (rect.top < rootHeight && rect.bottom > 0 && hasNext && !isFetching) {
      fetchMore();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const { hasNext, isFetching, fetchMore } = latest.current;

        if (entries[0].isIntersecting && hasNext && !isFetching) {
          fetchMore();
        }
      },
      {
        root: rootRef?.current || null,
        threshold: 1.0,
      }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
      observer.disconnect();
    };
  }, [targetRef, rootRef, loading, fetchMore]);
};

export default useInfiniteScroll;
