import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';

import { Form, FormikProvider, useFormik } from 'formik';
import {
  Box,
  Card,
  Container,
  Typography,
  Grid,
  Stack,
  TextField,
  Autocomplete,
  FormControlLabel,
  Switch,
  FormGroup,
  Button
} from '@material-ui/core';

import { LoadingButton } from '@material-ui/lab';
import { useEffect } from 'react';
import LoadingScreen from 'components/LoadingScreen';
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_CLIENT } from 'routes/paths';
import { useNavigate } from 'react-router';
import endpoints from 'services/request/endpoints';
import { axiosInstance } from 'services/instance';
import {
  CompanyEditUserPayloadProps,
  CompanyNewUserPayloadProps
} from 'services/request/models/payload';
import InputMask from 'react-input-mask';
import { CompanyNewUserViewProps } from '../Model';

const View: React.FC<CompanyNewUserViewProps> = ({
  loading,
  typePage,
  listGroups,
  selected,
  changePassword,
  setChangePassword
}) => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewSchema = Yup.object().shape({
    name: Yup.string().required('O Nome do usuário é obrigatório.'),
    cpf: Yup.string().required('O CPF do usuário é obrigatório.'),
    email: Yup.string().required('O Email do usuário é obrigatório.'),
    cellphone: Yup.string().required('O Celular do usuário é obrigatório.'),
    group_permission: Yup.object().required('O Grupo de permissão do usuário é obrigatório.'),
    password: Yup.string().required('A senha é obrigatória.'),
    confirmPassword: Yup.string()
      .required('Insira a senha novamente.')
      .oneOf([Yup.ref('password')], 'A senhas devem ser idênticas.')
  });

  const UpdateSchema = Yup.object().shape({
    name: Yup.string().required('O nome do usuário é obrigatório.'),
    cpf: Yup.string().required('O cpf do usuário é obrigatório.'),
    email: Yup.string().required('O email do usuário é obrigatório.'),
    cellphone: Yup.string().required('O celular do usuário é obrigatório.'),
    password: Yup.string(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'A senhas devem ser idênticas.')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      cpf: '',
      email: '',
      cellphone: '',
      active: true,
      updated_at: '',
      created_at: '',
      group_permission: {
        id: 0,
        descricao: ''
      },
      password: '',
      confirmPassword: ''
    },
    validationSchema: typePage === 'New' ? NewSchema : UpdateSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (typePage === 'New') {
        const payload = {
          nome: values.name,
          cpf: values.cpf,
          email: values.email,
          celular: values.cellphone,
          grupo_permissao: values.group_permission.id,
          senha: values.password
        } as CompanyNewUserPayloadProps;
        try {
          const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.client.user}`;
          const { status, data } = await axiosInstance.post(endpoint, payload);
          if (status === 200) {
            enqueueSnackbar('Cadastro efetuado com sucesso!', {
              variant: 'success'
            });
            navigate(PATH_CLIENT.general.administrative.users);
          } else {
            enqueueSnackbar('Ocorreu um problema.', {
              variant: 'error'
            });
          }
        } catch (error) {
          console.log('Error', error);
          setSubmitting(false);
          setErrors(error);
          console.log('Error', error);
          enqueueSnackbar('Ocorreu um problema.', {
            variant: 'error'
          });
        }
      } else {
        const payload = {
          nome: values.name,
          cpf: values.cpf,
          email: values.email,
          celular: values.cellphone,
          grupo_permissao: values.group_permission.id,
          ativo: values.active
        } as CompanyEditUserPayloadProps;

        if (values.password && values.password.length > 0) {
          payload.senha = values.password;
        }

        try {
          const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.client.user}/${selected?.id}`;
          const { status, data } = await axiosInstance.put(endpoint, payload);
          if (status === 200) {
            enqueueSnackbar('Cadastro atualizado com sucesso!', {
              variant: 'success'
            });
            navigate(PATH_CLIENT.general.administrative.users);
          } else {
            enqueueSnackbar('Ocorreu um problema.', {
              variant: 'error'
            });
          }
        } catch (error) {
          console.log('Error', error);
          setSubmitting(false);
          setErrors(error);
          console.log('Error', error);
          enqueueSnackbar('Ocorreu um problema.', {
            variant: 'error'
          });
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  useEffect(() => {
    if (selected) {
      formik.setFieldValue('active', selected.ativo);
      formik.setFieldValue('cellphone', selected.celular);
      formik.setFieldValue('cpf', selected.cpf);
      formik.setFieldValue('created_at', selected.created_at);
      formik.setFieldValue('email', selected.email);
      formik.setFieldValue('id', selected.id);
      formik.setFieldValue('name', selected.nome);
      formik.setFieldValue('cellphone', selected.celular);
      formik.setFieldValue('updated_at', selected.updated_at);
      // formik.setFieldValue('ip', selected?.ultimo_acesso?.ip);
      // formik.setFieldValue('last_access', selected.ultimo_acesso.last_access);
      formik.setFieldValue('group_permission', selected.grupo_permissao);
    }
  }, [selected]);

  if (loading) {
    return (
      <Page title={typePage === 'New' ? 'Novo Usuário' : 'Usuário'}>
        <Container>
          <HeaderBreadcrumbs
            heading="Usuários"
            links={[
              { name: 'Usuários', href: PATH_CLIENT.general.administrative.users },
              {
                name: typePage === 'New' ? 'Novo Usuário' : formik.getFieldProps('name').value
              }
            ]}
          />
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <LoadingScreen />
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Container>
      </Page>
    );
  }

  return (
    <Page title={typePage === 'New' ? 'Novo Grupo' : 'Grupo'}>
      <Container>
        <HeaderBreadcrumbs
          heading="Usuários"
          links={[
            { name: 'Usuários', href: PATH_CLIENT.general.administrative.users },
            {
              name: typePage === 'New' ? 'Novo Usuário' : formik.getFieldProps('name').value
            }
          ]}
        />
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Dados</Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
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
                        disabled={false}
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

                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={changePassword}
                            onChange={(event, value) => setChangePassword(value)}
                          />
                        }
                        label="Alterar senha"
                      />
                    </FormGroup>

                    {changePassword && (
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                        <TextField
                          fullWidth
                          type="password"
                          label="Senha"
                          {...getFieldProps('password')}
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                        />
                        <TextField
                          fullWidth
                          type="password"
                          label="Confirme a Senha"
                          {...getFieldProps('confirmPassword')}
                          error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                          helperText={touched.confirmPassword && errors.confirmPassword}
                        />
                      </Stack>
                    )}

                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={listGroups}
                      getOptionLabel={(option) => option.descricao || ''}
                      {...getFieldProps('group_permission')}
                      onChange={(event, value) => formik.setFieldValue('group_permission', value)}
                      renderInput={(group_permissionProp: any) => (
                        <TextField
                          {...group_permissionProp}
                          label="Grupo de Permissão"
                          error={Boolean(touched.group_permission && errors.group_permission)}
                        />
                      )}
                    />

                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formik.getFieldProps('active').value}
                            onChange={(event, value) => formik.setFieldValue('active', value)}
                          />
                        }
                        label="Usuário Ativo"
                      />
                    </FormGroup>
                  </Stack>
                  {/* {selected && selected?.ultimo_acesso?.ip?.length > 0 ? (
                    <Stack spacing={3} mt={3}>
                      <Typography variant="h5">Último Acesso</Typography>
                      <TextField
                        fullWidth
                        label="IP"
                        disabled
                        value={selected?.ultimo_acesso?.ip}
                      />
                      <TextField
                        fullWidth
                        label="Data"
                        disabled
                        value={moment(selected?.ultimo_acesso.last_access).format(
                          'DD/MM/YYYY HH:mm:ss'
                        )}
                      />
                    </Stack>
                  ) : null} */}
                  <Stack
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 2 }}
                  >
                    <Box sx={{ mt: 3, display: 'flex' }}>
                      <Button
                        variant="outlined"
                        type="button"
                        color="primary"
                        onClick={() => navigate(-1)}
                      >
                        Cancelar
                      </Button>
                    </Box>
                    <Box sx={{ mt: 3, display: 'flex' }}>
                      <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                        {typePage === 'New' ? 'Cadastrar' : 'Atualizar'}
                      </LoadingButton>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
};

export default View;
