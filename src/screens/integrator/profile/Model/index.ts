import { Dispatch, SetStateAction } from 'react';
import { ProfileIntegratorStateProps } from 'services/store/models/integrator';

export interface ProfileProps {
  data: {
    user: ProfileIntegratorStateProps;
    isLoading: boolean;
    handleModal: boolean;
    setHandleModal: Dispatch<SetStateAction<boolean>>;
  };
}
