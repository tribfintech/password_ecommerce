import { Dispatch, SetStateAction } from 'react';
import { ProfileClientStateProps } from 'services/store/models/client';

export interface ProfileProps {
  data: {
    user: ProfileClientStateProps;
    isLoading: boolean;
    handleModal: boolean;
    setHandleModal: Dispatch<SetStateAction<boolean>>;
  };
}
