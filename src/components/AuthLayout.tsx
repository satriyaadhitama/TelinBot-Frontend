import { Outlet, useNavigate } from 'react-router-dom';
import { verifyToken } from '@/services/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/types/auth/RootState';
import { resetState } from '@/reducers/auth';

function AuthLayout() {
  const refreshToken = useSelector(
    (state: RootState) => state.auth.token?.refresh
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const response = await verifyToken(refreshToken);
      const statusCode = response.status;
      if (statusCode === 401) {
        dispatch(resetState());
      }
    };
    checkToken();
  }, [navigate, refreshToken]);

  return <Outlet />;
}

export default AuthLayout;
