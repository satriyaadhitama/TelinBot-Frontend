import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '@/types/auth/RootState';

interface ProtectedLayoutProps {
  allowedGroups?: string[];
}

function ProtectedLayout({
  allowedGroups = [],
}: Readonly<ProtectedLayoutProps>) {
  const { groups } = useSelector((state: RootState) => state.auth.user);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const hasPermission = groups.some((group) => allowedGroups.includes(group));

  if (hasPermission) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default ProtectedLayout;
