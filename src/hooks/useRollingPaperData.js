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

  return { data, loading };
};

export default useRollingPaperData;
