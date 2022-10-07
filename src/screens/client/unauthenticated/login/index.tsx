import React from 'react';
import { useSnackbar } from 'notistack5';
import { MIconButton } from 'components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useNavigate } from 'react-router';
import { PATH_CLIENT, PATH_COMPANY } from 'routes/paths';
import { useAppDispatch } from 'services/request/baseQuery';

import { fetchLoginClient } from 'services/store/actions/authclient.action';
import View from './View';
import { LoginProps } from './Model';

const SignInClient: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  const SubmitCallback = async (values: LoginProps) => {
    const payloadLogin = {
      cpf: values.cpf,
      senha: values.password
    };

    const response = await dispatch(fetchLoginClient(payloadLogin));

    if (response.meta.requestStatus === 'fulfilled') {
      enqueueSnackbar('Sucesso!', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });

      navigate('/painel-cliente/home');

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

export default SignInClient;
