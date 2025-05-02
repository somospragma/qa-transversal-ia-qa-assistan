import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import {IProtected} from './interface';



export const ProtectedRoute: FC<IProtected> = ({ children, isAuthenticated, type }) => {
  if (type === 'private') {
    return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" />;
  }

  return !isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
