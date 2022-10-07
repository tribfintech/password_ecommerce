import { FC, ReactElement, useEffect, useState } from 'react';
import { useAppSelector } from 'services/request/baseQuery';
import { useDispatch } from 'services/store';
import { fetchProfile } from 'services/store/actions/client/profile.action';
import View from './View';

const ClientProfile: FC = (): ReactElement => {
  const dispatch = useDispatch();

  const [user] = useAppSelector((state) => [state.ProfileClient]);
  const [handleModal, setHandleModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return <View data={{ user, isLoading: user.loading, handleModal, setHandleModal }} />;
};
export default ClientProfile;
