import ErrorProvider from '@/context/error/ErrorProvider';
import Router from '@/router/Router';

const App = () => {
  return (
    <ErrorProvider>
      <Router />;
    </ErrorProvider>
  );
};

export default App;
