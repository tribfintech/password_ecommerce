import { Dispatch, SetStateAction } from 'react';
import { ProfileAdminStateProps } from 'services/store/models/admin';

export interface ProfileProps {
  data: {
    user: ProfileAdminStateProps;
    isLoading: boolean;
    handleModal: boolean;
    setHandleModal: Dispatch<SetStateAction<boolean>>;
  };
}
