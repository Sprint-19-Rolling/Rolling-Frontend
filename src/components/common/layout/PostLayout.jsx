import { Outlet, useParams } from 'react-router';
import Error from '@/components/common/Error';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import ListBackground from '@/components/rolling-paper-list/ListBackground';
import SubHeader from '@/components/rolling-paper-list/sub-header/SubHeader';
import useError from '@/hooks/useError';
import useRecipientData from '@/hooks/useRecipientData';

const PostLayout = () => {
  const { id } = useParams();
  const { error } = useError();
  const { recipientData } = useRecipientData(id);

  return (
    <>
      <Header />
      <SubHeader recipientId={id} />
      <ListBackground
        backgroundImageURL={recipientData?.backgroundImageURL}
        backgroundColor={recipientData?.backgroundColor ?? 'beige'}
        className="wrapper-px min-h-[calc(100dvh-297px)] w-full">
        <div className="content pt-15 pb-25">
          {error ? <Error /> : <Outlet />}
        </div>
      </ListBackground>
      <Footer />
    </>
  );
};

export default PostLayout;
