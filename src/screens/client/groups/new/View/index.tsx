import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';

import { Form, FormikProvider, useFormik } from 'formik';
import {
  Box,
  Card,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  TextField,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControlLabel,
  Switch,
  FormGroup,
  Checkbox,
  Tooltip
} from '@material-ui/core';

import { LoadingButton } from '@material-ui/lab';
import InputMask from 'react-input-mask';
import { termMock } from 'components/_dashboard/companies/termMock';
import { useEffect, useState } from 'react';
import moment from 'moment';
import LoadingScreen from 'components/LoadingScreen';
import { fetchCreateCompany, UpdateCompany } from 'services/store/actions/company.action';
import { useAppDispatch } from 'services/request/baseQuery';
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_ADMIN, PATH_COMPANY, PATH_CLIENT } from 'routes/paths';
import { useNavigate } from 'react-router';
import endpoints from 'services/request/endpoints';
import { axiosInstance } from 'services/instance';
import { NewGroupViewProps } from '../Model';

const View: React.FC<NewGroupViewProps> = ({
  loading,
  typePage,
  permissionsList,
  permissions,
  addPermission,
  selected
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewSchema = Yup.object().shape({
    description: Yup.string().required('A descrição do Grupo é obrigatória.')
  });

  const UpdateSchema = Yup.object().shape({
    description: Yup.string().required('A descrição do Grupo é obrigatória.')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: ''
    },
    validationSchema: typePage === 'New' ? NewSchema : UpdateSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (typePage === 'New') {
        const payload = {
          descricao: values.description,
          permissoes: permissions
        };
        try {
          const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.integrator.group}`;

          const { status, data } = await axiosInstance.post(endpoint, payload);
          if (status === 200) {
            enqueueSnackbar('Cadastro efetuado com sucesso!', {
              variant: 'success'
            });
            navigate(PATH_CLIENT.general.administrative.groups);
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
          descricao: values.description,
          permissoes: permissions
        };
        try {
          const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.integrator.groups}/${selected?.id}`;

          const { status, data } = await axiosInstance.put(endpoint, payload);
          if (status === 200) {
            enqueueSnackbar('Cadastro atualizado com sucesso!', {
              variant: 'success'
            });
            navigate(PATH_CLIENT.general.administrative.groups);
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
      formik.setFieldValue('description', selected.descricao);
    }
  }, [selected]);

  if (loading) {
    return (
      <Page title={typePage === 'New' ? 'Novo Grupo' : 'Grupo'}>
        <Container>
          <HeaderBreadcrumbs
            heading="Grupos de Permissão"
            links={[
              { name: 'Grupos', href: PATH_CLIENT.general.management.groups },
              {
                name: typePage === 'New' ? 'Novo Grupo' : formik.getFieldProps('description').value
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
          heading="Grupos de Permissão"
          links={[
            { name: 'Grupos', href: PATH_CLIENT.general.management.groups },
            {
              name: typePage === 'New' ? 'Novo Grupo' : formik.getFieldProps('description').value
            }
          ]}
        />
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Dados Básicos</Typography>
                    <TextField
                      fullWidth
                      label="Descrição"
                      {...getFieldProps('description')}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Stack>

                  <Stack spacing={3} sx={{ mt: 3 }}>
                    <Typography variant="h5">Permissões</Typography>
                    <FormGroup style={{ width: '100%', justifyContent: 'space-around' }}>
                      {permissionsList.map((item, index) => (
                        <Tooltip key={index} title={item.detalhes} placement="bottom-start">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  !!permissions.find((element) => element === item.permissao)
                                }
                              />
                            }
                            label={item.permissao.toUpperCase()}
                            onChange={() => addPermission(item)}
                          />
                        </Tooltip>
                      ))}
                    </FormGroup>
                  </Stack>
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
