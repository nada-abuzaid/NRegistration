import { createBrowserRouter } from 'react-router-dom';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);

export default router;
