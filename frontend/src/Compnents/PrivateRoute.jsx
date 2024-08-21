import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import { useEffect } from 'react';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { signoutSuccess } from '../redux/slices/user.slice';

export default function PrivateRoute() {
  
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <HomePage />;
}