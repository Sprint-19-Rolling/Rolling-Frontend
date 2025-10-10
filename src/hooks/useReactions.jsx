import { useCallback } from 'react';
import { getReactions } from '@/apis/reactions';
import useDataFetch from '@/hooks/useDataFetch';
import useResponsiveSize from '@/hooks/useResponsiveSize';

const useReactions = (recipientId) => {
  const pageSize = useResponsiveSize();

  const fetcher = useCallback(
    (signal) => getReactions(recipientId, pageSize, signal),
    [recipientId, pageSize]
  );

  const { data, setData, loading } = useDataFetch(fetcher, [
    recipientId,
    pageSize,
  ]);

  return { reactions: data, setReactions: setData, loading, pageSize };
};

export default useReactions;
