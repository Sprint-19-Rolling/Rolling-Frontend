import { useParams } from 'react-router';
import MessageList from '@/components/rolling-paper-list/MessageList';
import ToggleSwitch from '@/components/rolling-paper-list/ToggleSwitch';

const PostDetail = () => {
  const { id } = useParams();
  return (
    <>
      <div className="mb-4 flex h-10 items-center">
        <ToggleSwitch to={`/post/${id}/edit`} />
      </div>
      <MessageList recipientId={id} />
    </>
  );
};
export default PostDetail;
