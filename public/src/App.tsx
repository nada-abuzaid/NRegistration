import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
);

export default App;
