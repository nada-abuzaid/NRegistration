import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
