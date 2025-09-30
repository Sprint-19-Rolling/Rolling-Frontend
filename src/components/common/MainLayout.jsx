import { Outlet } from 'react-router';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="wrapper-px flex-grow">
        <div className="content">
          <Outlet />
        </div>
      </main>
      <Footer className={'pb-32'} />
    </div>
  );
};

export default MainLayout;
