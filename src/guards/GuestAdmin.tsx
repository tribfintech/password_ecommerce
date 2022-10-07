import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { axiosInstance } from 'services/instance';
import { RootState, useSelector } from 'services/store';
// routes
import { PATH_ADMIN } from '../routes/paths';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestAdmin({ children }: GuestGuardProps) {
  const AuthAdmin = useSelector((state: RootState) => state.AuthAdmin);
  const { signed, token } = AuthAdmin;

  if (signed) {
    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer ${token.value}`
    };

    return <Navigate to={PATH_ADMIN.general.home} />;
  }

  return <>{children}</>;
}
