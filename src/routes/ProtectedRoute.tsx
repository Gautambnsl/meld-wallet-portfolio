/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';

const ProtectedRoute = ({ children }: any) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
