import { PrcConfigProvider } from './libs/PrcConfigProvider.tsx';
import Home from './pages/home.tsx';

const App = () => {
  return (
    <div>
      <PrcConfigProvider>
        <Home />
      </PrcConfigProvider>
    </div>
  );
};

export default App;
