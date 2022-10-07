import React from 'react';
import { useSnackbar } from 'notistack5';
import { MIconButton } from 'components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useNavigate } from 'react-router';
import { PATH_APP } from 'routes/paths';
import { useAppDispatch } from 'services/request/baseQuery';
import { fetchLoginAdmin } from 'services/store/actions/auth.action';
import { axiosInstance } from 'services/instance';
import View from './View';
import { LoginProps } from './Model';

const SignInAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  const SubmitCallback = async (values: LoginProps) => {
    const payloadLogin = {
      email: values.email,
      senha: values.password
    };

    const response: any = await dispatch(fetchLoginAdmin(payloadLogin));

    if (response.meta.requestStatus === 'fulfilled') {
      enqueueSnackbar('Sucesso!', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });

      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${response.payload.token.value}`
      };

      navigate(PATH_APP.admin.home);

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

export default SignInAdmin;
