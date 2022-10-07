import React from 'react';
import { useSnackbar } from 'notistack5';
import { MIconButton } from 'components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useNavigate } from 'react-router';
import { PATH_COMPANY } from 'routes/paths';
import { useAppDispatch } from 'services/request/baseQuery';

import { fetchLogin } from 'services/store/actions/integrator/auth.action';
import View from './View';
import { LoginProps } from './Model';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  const SubmitCallback = async (values: LoginProps) => {
    const payloadLogin = {
      cpf: values.cpf,
      senha: values.password
    };

    const response = await dispatch(fetchLogin(payloadLogin));

    if (response.meta.requestStatus === 'fulfilled') {
      enqueueSnackbar('Sucesso!', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });

      navigate(PATH_COMPANY.general.home);

      return true;
    }
    enqueueSnackbar('Ocorreu um erro!', {
      variant: 'error',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });

    return false;
  };
  return <View {...{ SubmitCallback }} />;
};

export default SignIn;
