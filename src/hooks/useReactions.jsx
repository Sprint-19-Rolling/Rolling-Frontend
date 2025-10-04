import { useCallback } from 'react';
import { teamApi } from '@/apis/axios';
import useDataFetch from '@/hooks/useDataFetch';
import useResponsiveSize from '@/hooks/useResponsiveSize';

const useReactions = (recipientId) => {
  const pageSize = useResponsiveSize();

  const fetcher = useCallback(
    async (signal) => {
      const limit = pageSize;
      const res = await teamApi.get(
        `recipients/${recipientId}/reactions/?limit=${limit}&offset=0`,
        { signal }
      );

      return res.data.results;
    },
    [recipientId, pageSize]
  );

  const { data, setData, loading } = useDataFetch(fetcher, [
    recipientId,
    pageSize,
  ]);

  return { reactions: data, setReactions: setData, loading, pageSize };
};

export default useReactions;
