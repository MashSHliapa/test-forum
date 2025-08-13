import { Navigate } from 'react-router-dom';
import type { IProtectedRouteProps } from '../../types/interfaces';

const isSignInCompleted = () => {
  return Boolean(localStorage.getItem('user'));
};

export function ProtectedRoute({ children }: IProtectedRouteProps) {
  if (!isSignInCompleted()) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}
