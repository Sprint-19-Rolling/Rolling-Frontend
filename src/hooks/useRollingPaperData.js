import { getRollingPaperData } from '@/apis/recipients';
import { LIST_LIMIT } from '@/constants/list';
import useDataFetch from '@/hooks/useDataFetch';

const useRollingPaperData = (sort) => {
  const fetcher = async (signal) =>
    getRollingPaperData(
      { limit: LIST_LIMIT, sort: sort === 'like' ? 'like' : null },
      signal
    );

  const { data, loading } = useDataFetch(fetcher, [sort]);

  const fetchRollingPaperData = async (url) => {
    if (!url) {
      return await getRollingPaperData({
        limit: LIST_LIMIT,
        sort: sort === 'like' ? 'like' : null,
      });
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
    }
    const json = await res.json();
    return json;
  };

  return { data, loading, fetchRollingPaperData };
};

export default useRollingPaperData;
