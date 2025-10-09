import ErrorProvider from '@/context/error/ErrorProvider';
import useKakaoInit from '@/hooks/useKakaoInit';
import Router from '@/router/Router';

const App = () => {
  useKakaoInit();
  return (
    <ErrorProvider>
      <Router />
    </ErrorProvider>
  );
};

export default App;
