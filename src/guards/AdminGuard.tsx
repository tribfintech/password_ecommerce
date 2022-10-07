import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SignInAdmin from 'screens/admin/unauthenticated/login';
import { axiosInstance } from 'services/instance';
import { RootState, useSelector } from 'services/store';

type AdminGuardProps = {
  children: ReactNode;
};

export default function AdminGuard({ children }: AdminGuardProps) {
  const AuthAdmin = useSelector((state: RootState) => state.AuthAdmin);
  const { signed, token } = AuthAdmin;

  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!signed) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <SignInAdmin />;
  }

  axiosInstance.defaults.headers.common = {
    Authorization: `Bearer ${token.value}`
  };

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
