import { useEffect } from 'react';

/**
 * 무한 스크롤 훅
 * @param {Object} options
 * @param {React.RefObject} options.targetRef - 관찰할 DOM ref
 * @param {boolean} options.hasNext - 다음 데이터를 가져올 수 있는지 여부
 * @param {boolean} options.loading - 현재 로딩 상태
 * @param {boolean} options.isFetching - 추가 요청 중인지 여부
 * @param {Function} options.fetchMore - 데이터를 추가로 가져오는 함수
 */
const useInfiniteScroll = ({
  targetRef,
  hasNext,
  loading,
  isFetching,
  fetchMore,
}) => {
  useEffect(() => {
    if (loading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNext && !isFetching) {
          fetchMore();
        }
      },
      { threshold: 1.0 }
    );

    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [targetRef, hasNext, loading, isFetching, fetchMore]);
};

export default useInfiniteScroll;
