import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SignInClient from 'screens/client/unauthenticated/login';
import { axiosInstance } from 'services/instance';
import { RootState, useSelector } from 'services/store';

type GuardProps = {
  children: ReactNode;
};

export default function ClientGuard({ children }: GuardProps) {
  const AuthClient = useSelector((state: RootState) => state.AuthClient);
  const { signed, token } = AuthClient;

  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!signed) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <SignInClient />;
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
