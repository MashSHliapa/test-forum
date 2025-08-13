import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { PostsList } from './pages/PostsList/PostsList';
import { Users } from './pages/Users/Users';
import { CardItem } from './pages/CardItem/CardItem';
import { Favorites } from './pages/Favorites/Favorites';
import { SignIn } from './pages/SignIn/SignIn';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { LayoutSignIn } from './components/LayoutSignIn/LayoutSignIn';
import { CreatePost } from './pages/CreatePost/CreatePost';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <PostsList />
          </ProtectedRoute>
        ),
      },
      {
        path: '/selected/:id',
        element: (
          <ProtectedRoute>
            <CardItem />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: '/favorites',
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: '/create-post',
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <LayoutSignIn />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
]);
