import { teamApi } from '@/apis/axios';
import { RECIPIENT_PAGE_LIMIT } from '@/constants/rollingPaperList';
import useDataFetch from '@/hooks/useDataFetch';

const useReactions = (recipientId) => {
  const fetcher = async (signal) => {
    const res = await teamApi.get(
      `recipients/${recipientId}/reactions/?limit=${RECIPIENT_PAGE_LIMIT}&offset=0`,
      {
        signal,
      }
    );

    return res.data.results;
  };

  const { data, loading } = useDataFetch(fetcher, [recipientId]);

  return { reactions: data, loading };
};

export default useReactions;
