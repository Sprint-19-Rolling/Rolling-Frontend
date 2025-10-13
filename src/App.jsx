import ToastContainer from '@/components/rolling-paper-list/toast/ToastContainer';
import ErrorProvider from '@/context/error/ErrorProvider';
import ToastProvider from '@/context/toast/ToastProvider';
import useKakaoInit from '@/hooks/useKakaoInit';
import Router from '@/router/Router';

const App = () => {
  useKakaoInit();
  return (
    <ErrorProvider>
      <ToastProvider>
        <Router />
        <ToastContainer />
      </ToastProvider>
    </ErrorProvider>
  );
};

export default App;
