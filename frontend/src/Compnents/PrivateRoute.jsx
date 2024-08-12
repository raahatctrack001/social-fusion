import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import HomePage from '../Pages/HomePage';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <HomePage />;
}