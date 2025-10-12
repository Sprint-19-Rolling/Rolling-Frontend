import { useState, useEffect } from 'react';
import RollingPaperList from '@/components/papers/RollingPaperList';
import useError from '@/hooks/useError';
import useRollingPaperData from '@/hooks/useRollingPaperData';

const LikeSortedRollingPaper = () => {
  const { error } = useError();
  const { fetchRollingPaperData } = useRollingPaperData('like');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async (url) => {
    setLoading(true);
    const result = await fetchRollingPaperData(url);
    setData(result);
    setLoading(false);
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

export default LikeSortedRollingPaper;
