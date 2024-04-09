import { logoutUser } from '@/reducers/auth';
import { useDispatch } from 'react-redux';

const useLogoutHandler = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return handleLogout;
};

export default useLogoutHandler;
