import { getRollingPaperData } from '@/apis/recipients';
import { LIST_LIMIT } from '@/constants/list';

/**
 * 롤링페이퍼 데이터를 가져오는 커스텀 훅
 * - 정렬 기준(sort)과 페이지네이션 URL에 따라 데이터를 가져옵니다.
 * - 컴포넌트에서 data/loading/error 상태를 직접 관리할 때 사용합니다.
 * @param {string} [sort] - 정렬 기준 ('like' 또는 undefined)
 * @returns {{ fetchRollingPaperData: (url?: string) => Promise<any> }}
 */
const useRollingPaperData = (sort) => {
  const fetchRollingPaperData = async (url) =>
    getRollingPaperData({
      limit: LIST_LIMIT,
      sort: sort === 'like' ? 'like' : null,
      url,
    });

  return { fetchRollingPaperData };
};

export default useRollingPaperData;
