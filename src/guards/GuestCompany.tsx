import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { axiosInstance } from 'services/instance';
// import { RootState, useSelector } from 'services/store';
// // routes
// import { PATH_COMPANY } from '../routes/paths';

// // ----------------------------------------------------------------------

// type GuestGuardProps = {
//   children: ReactNode;
// };

// export default function GuestCompany({ children }: GuestGuardProps) {
//   const AuthCompany = useSelector((state: RootState) => state.AuthCompany);
//   const { signed, token } = AuthCompany;

//   if (signed) {
//     axiosInstance.defaults.headers.common = {
//       Authorization: `Bearer ${token.value}`
//     };

//     return <Navigate to={PATH_COMPANY.general.home} />;
//   }

//   return <>{children}</>;
// }
