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
import moment from 'moment';
import LoadingScreen from 'components/LoadingScreen';
import { useAppDispatch } from 'services/request/baseQuery';
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_ADMIN } from 'routes/paths';
import { useNavigate } from 'react-router';
import endpoints from 'services/request/endpoints';
import { axiosInstance } from 'services/instance';
import { NewAdministrativeUserPayloadProps } from 'services/request/models/payload';
import { NewUserViewProps } from '../Model';

const View: React.FC<NewUserViewProps> = ({ loading, typePage, listGroups, selected }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewSchema = Yup.object().shape({
    name: Yup.string().required('O nome do usuário é obrigatório.'),
    cpf: Yup.string().required('O cpf do usuário é obrigatório.'),
    email: Yup.string().required('O email do usuário é obrigatório.'),
    cellphone: Yup.string().required('O celular do usuário é obrigatório.'),
    group_permission: Yup.object().required('O grupo de permissão do usuário é obrigatório.')
  });

  const UpdateSchema = Yup.object().shape({
    name: Yup.string().required('O nome do usuário é obrigatório.'),
    cpf: Yup.string().required('O cpf do usuário é obrigatório.'),
    email: Yup.string().required('O email do usuário é obrigatório.'),
    cellphone: Yup.string().required('O celular do usuário é obrigatório.'),
    group_permission: Yup.object().required('O grupo de permissão do usuário é obrigatório.')
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
      }
    },
    validationSchema: typePage === 'New' ? NewSchema : UpdateSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (typePage === 'New') {
        const payload = {
          nome: values.name,
          cpf: values.cpf,
          email: values.email,
          celular: values.cellphone,
          grupo_permissao: values.group_permission.id
        } as NewAdministrativeUserPayloadProps;
        try {
          const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.administrative.user}`;
          const { status, data } = await axiosInstance.post(endpoint, payload);
          if (status === 200) {
            enqueueSnackbar('Cadastro efetuado com sucesso!', {
              variant: 'success'
            });
            navigate(PATH_ADMIN.general.administrative.users);
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
        } as NewAdministrativeUserPayloadProps;
        try {
          const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.administrative.user}/${selected?.id}`;
          const { status, data } = await axiosInstance.put(endpoint, payload);
          if (status === 200) {
            enqueueSnackbar('Cadastro atualizado com sucesso!', {
              variant: 'success'
            });
            navigate(PATH_ADMIN.general.administrative.users);
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
      formik.setFieldValue('ip', selected?.ultimo_acesso?.ip);
      formik.setFieldValue('last_access', selected.ultimo_acesso?.last_access);
      formik.setFieldValue('group_permission', selected.grupo_permissao);
    }
  }, [selected]);

  if (loading) {
    return (
      <Page title={typePage === 'New' ? 'Novo Usuário' : 'Usuário'}>
        <Container>
          <HeaderBreadcrumbs
            heading="Usuários Administrativos"
            links={[
              { name: 'Usuários', href: PATH_ADMIN.general.administrative.users },
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
          heading="Usuários Administrativos"
          links={[
            { name: 'Usuários', href: PATH_ADMIN.general.administrative.users },
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
                      <TextField
                        fullWidth
                        label="CPF"
                        {...getFieldProps('cpf')}
                        error={Boolean(touched.cpf && errors.cpf)}
                        helperText={touched.cpf && errors.cpf}
                        sx={{ width: 600 }}
                      />
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
                      <TextField
                        fullWidth
                        label="Celular"
                        {...getFieldProps('cellphone')}
                        error={Boolean(touched.cellphone && errors.cellphone)}
                        helperText={touched.cellphone && errors.cellphone}
                        sx={{ width: 600 }}
                      />
                    </Stack>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={listGroups}
                      getOptionLabel={(option) => option.descricao}
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
                  {selected && selected?.ultimo_acesso?.ip?.length > 0 ? (
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
                  ) : null}
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
