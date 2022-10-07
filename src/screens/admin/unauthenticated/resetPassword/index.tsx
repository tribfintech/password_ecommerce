import { useAppDispatch } from 'services/request/baseQuery';
import { fetchAdministrativeRecovery } from 'services/store/actions/admin/auth.action';
import View from './View';

const AdminResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();

  async function fetchRecovery(email: string) {
    const response = await dispatch(fetchAdministrativeRecovery({ email }));
    return response;
  }

  return <View {...{ fetchRecovery }} />;
};
export default AdminResetPassword;
