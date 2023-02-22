import { ReactNode } from 'react';
// import { Navigate } from 'react-router-dom';
// import { axiosInstance } from 'services/instance';
// import { RootState, useSelector } from 'services/store';
// // routes
// import { PATH_CLIENT } from '../routes/paths';

// // ----------------------------------------------------------------------

// type GuestGuardProps = {
//   children: ReactNode;
// };

// export default function GuestClient({ children }: GuestGuardProps) {
//   const AuthClient = useSelector((state: RootState) => state.AuthClient);
//   const { signed, token } = AuthClient;

//   if (signed) {
//     axiosInstance.defaults.headers.common = {
//       Authorization: `Bearer ${token.value}`
//     };

//     return <Navigate to={PATH_CLIENT.general.home} />;
//   }

//   return <>{children}</>;
// }
