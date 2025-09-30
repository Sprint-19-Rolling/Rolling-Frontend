import { Outlet } from 'react-router';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="wrapper-px">
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer className={'pb-32'} />
    </>
  );
};

export default MainLayout;
