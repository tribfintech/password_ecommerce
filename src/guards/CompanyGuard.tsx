import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SignIn from 'screens/integrator/unauthenticated/login';
import { axiosInstance } from 'services/instance';
import { RootState, useSelector } from 'services/store';

type CompanyGuardProps = {
  children: ReactNode;
};

export default function CompanyGuard({ children }: CompanyGuardProps) {
  const AuthCompany = useSelector((state: RootState) => state.AuthCompany);
  const { signed, token } = AuthCompany;

  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!signed) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <SignIn />;
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
