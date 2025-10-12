import { getRollingPaperData } from '@/apis/recipients';
import useDataFetch from '@/hooks/useDataFetch';

const useRollingPaperData = (sort) => {
  const fetcher = async (signal) =>
    getRollingPaperData(
      { limit: 4, sort: sort === 'like' ? 'like' : null },
      signal
    );
  const { data, loading } = useDataFetch(fetcher, [sort]);

  return { data, loading };
};

export default useRollingPaperData;
