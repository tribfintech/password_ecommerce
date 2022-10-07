import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';

import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import InputMask from 'react-input-mask';
import { MIconButton } from 'components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';

import AvatarDefault from 'assets/images/defaultPerson.png';
// utils

// @types
import {
  fetchEditProfile,
  fetchChangePassword
} from 'services/store/actions/integrator/profile.action';
import {
  ProfileChangePasswordPayloadProps,
  ProfileEditPayloadProps
} from 'services/request/models/payload';
import LoadingScreen from 'components/LoadingScreen';
import { AxiosError, AxiosResponse } from 'axios';
import { ProfileChangePasswordResponseProps } from 'services/request/models/response';
import { ProfileProps } from '../Model';

const Profile: React.FC<ProfileProps> = ({ data }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { user, isLoading, handleModal, setHandleModal } = data;

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('O nome do usuário é obrigatório.')
  });

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string(),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(8, 'A senha é muito curta, insira no mínimo 8 caracteres.'),
    passwordConfirm: Yup.string()
      .required('Reinsira a senha.')
      .oneOf([Yup.ref('password')], 'A senhas devem ser idênticas.')
  });

  const closeDialog = () => {
    setHandleModal(false);
    formikChangePassword.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: user.nome,
      cpf: user.cpf,
      email: user.email,
      cellphone: user.celular
    },
    enableReinitialize: true,
    validationSchema: ProfileSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const payload = {
        nome: values.name,
        celular: values.cellphone,
        email: values.email
      } as ProfileEditPayloadProps;

      setSubmitting(true);

      try {
        const response = await fetchEditProfile(payload);

        setSubmitting(false);

        enqueueSnackbar(response.message, {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      } catch (error) {
        console.log('error', error);
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const formikChangePassword = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      passwordConfirm: ''
    },
    enableReinitialize: true,
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const payload = {
        atual: values.oldPassword,
        nova: values.password
      } as ProfileChangePasswordPayloadProps;

      setSubmitting(true);

      try {
        const response = await fetchChangePassword(payload);

        const success = response as AxiosResponse<ProfileChangePasswordResponseProps>;
        const failed = response as AxiosError<{ error: string }>;

        if (success.status === 200) {
          enqueueSnackbar(success.data.message, {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });

          setSubmitting(false);
          closeDialog();
        } else {
          enqueueSnackbar(failed.response?.data.error, {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        }
      } catch (error) {
        console.log('error', error);
        setSubmitting(false);
      }
    }
  });

  const renderDialogChangePassword = () => (
    <Dialog maxWidth="sm" fullWidth open={handleModal}>
      <FormikProvider value={formikChangePassword}>
        <DialogContent>
          <Form autoComplete="off" noValidate onSubmit={formikChangePassword.handleSubmit}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <Typography variant="h5">Alterar senha</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                <TextField
                  fullWidth
                  label="Senha antiga"
                  {...getFieldProps('oldPassword')}
                  value={formikChangePassword.values.oldPassword}
                  error={Boolean(
                    formikChangePassword.touched.oldPassword &&
                      formikChangePassword.errors.oldPassword
                  )}
                  helperText={
                    formikChangePassword.touched.oldPassword &&
                    formikChangePassword.errors.oldPassword
                  }
                  onChange={formikChangePassword.handleChange}
                  sx={{ width: 600 }}
                  type="password"
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                <TextField
                  fullWidth
                  type="password"
                  label="Senha"
                  {...getFieldProps('password')}
                  value={formikChangePassword.values.password}
                  error={Boolean(
                    (formikChangePassword.touched.password &&
                      formikChangePassword.errors.password) ||
                      (formikChangePassword.touched.passwordConfirm &&
                        formikChangePassword.errors.passwordConfirm)
                  )}
                  helperText={
                    formikChangePassword.touched.password && formikChangePassword.errors.password
                  }
                  onChange={formikChangePassword.handleChange}
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirme a Senha"
                  {...getFieldProps('passwordConfirm')}
                  value={formikChangePassword.values.passwordConfirm}
                  error={Boolean(
                    formikChangePassword.touched.passwordConfirm &&
                      formikChangePassword.errors.passwordConfirm
                  )}
                  helperText={
                    formikChangePassword.touched.passwordConfirm &&
                    formikChangePassword.errors.passwordConfirm
                  }
                  onChange={formikChangePassword.handleChange}
                />
              </Stack>
            </Stack>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={() => closeDialog()}>
            Cancelar
          </Button>
          <LoadingButton
            variant="contained"
            type="button"
            loading={formikChangePassword.isSubmitting}
            onClick={() => formikChangePassword.handleSubmit()}
          >
            Alterar
          </LoadingButton>
        </DialogActions>
      </FormikProvider>
    </Dialog>
  );

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth="lg">
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      py: 6,
                      px: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={AvatarDefault}
                      alt="avatar"
                      style={{
                        width: '200px',
                        height: '200px',
                        border: '2px dashed #cccccc7d',
                        borderRadius: '50%'
                      }}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={{ xs: 2, md: 3 }}>
                      <Typography variant="h5">Meus Dados</Typography>
                      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField
                          fullWidth
                          label="Nome"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                          sx={{ width: 600 }}
                        />
                        <InputMask
                          mask="999.999.999-99"
                          disabled={true}
                          maskChar=""
                          error={Boolean(touched.cpf && errors.cpf)}
                          helperText={touched.cpf && errors.cpf}
                          sx={{ width: 600 }}
                          {...getFieldProps('cpf')}
                        >
                          {(inputProps: any) => <TextField {...inputProps} fullWidth label="CPF" />}
                        </InputMask>
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="E-mail"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                          sx={{ width: 600 }}
                        />

                        <InputMask
                          mask="(99) 999 999 999"
                          disabled={false}
                          maskChar=""
                          error={Boolean(touched.cellphone && errors.cellphone)}
                          helperText={touched.cellphone && errors.cellphone}
                          sx={{ width: 600 }}
                          {...getFieldProps('cellphone')}
                        >
                          {(inputProps: any) => (
                            <TextField {...inputProps} fullWidth label="Celular" />
                          )}
                        </InputMask>
                      </Stack>
                    </Stack>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Atualizar
                      </LoadingButton>
                      <LoadingButton
                        type="button"
                        variant="contained"
                        onClick={() => setHandleModal(true)}
                      >
                        Alterar senha
                      </LoadingButton>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>

          {renderDialogChangePassword()}
        </Container>
      )}
    </>
  );
};

export default Profile;
