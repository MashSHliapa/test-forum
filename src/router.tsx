import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { PostsList } from './pages/PostsList/PostsList';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <PostsList />,
      },
    ],
  },
]);
