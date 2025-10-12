import { useState, useEffect } from 'react';
import RollingPaperList from '@/components/papers/RollingPaperList';
import useError from '@/hooks/useError';
import useRollingPaperData from '@/hooks/useRollingPaperData';

const RecentSortedRollingPaper = () => {
  const { error, setError } = useError();
  const { fetchRollingPaperData } = useRollingPaperData();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const result = await fetchRollingPaperData(url);
      setData(result);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (url) => {
    fetchData(url);
  };

  if (error) {
    return <div className="text-error">에러가 발생했어요!</div>;
  }

  return (
    <RollingPaperList
      data={data}
      loading={loading}
      onPageChange={handlePageChange}
    />
  );
};

export default RecentSortedRollingPaper;
