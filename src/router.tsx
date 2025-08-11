import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { PostsList } from './pages/PostsList/PostsList';
import { Users } from './pages/Users/Users';
import { CardItem } from './pages/CardItem/CardItem';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <PostsList />,
      },
      {
        path: '/selected/:id',
        element: <CardItem />,
      },
      {
        path: '/users',
        element: <Users />,
      },
    ],
  },
]);
