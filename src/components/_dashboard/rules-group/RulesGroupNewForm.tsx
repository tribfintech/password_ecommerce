import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { Box, Card, Grid, Stack, TextField } from '@material-ui/core';
// utils
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { CompanyManager } from '../../../@types/company'; // MUDAR
// ----------------------------------------------------------------------

type RulesGroupNewFormProps = {
  isEdit: boolean;
  currentRulesGroup?: CompanyManager;
};

export default function RulesGroupNewForm({ isEdit, currentRulesGroup }: RulesGroupNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewRulesGroupSchema = Yup.object().shape({
    cod: Yup.string().required('Código é obrigatório'),
    typeOfInformation: Yup.string().required('Tipo de Informação é obrigatório'),
    name: Yup.string().required('Nome é obrigatório'),
    description: Yup.string().required('Descrição é obrigatório')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cod: currentRulesGroup?.cod || '',
      typeOfInformation: currentRulesGroup?.cnpj || '',
      name: currentRulesGroup?.name || '',
      description: currentRulesGroup?.email || ''
    },
    validationSchema: NewRulesGroupSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Criado com sucesso' : 'Atualizado com sucesso', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.registers.rulesGroup);
      } catch (error: any) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    sx={{ maxWidth: 100 }}
                    fullWidth
                    label="Código"
                    {...getFieldProps('cod')}
                    error={Boolean(touched.cod && errors.cod)}
                    helperText={touched.cod && errors.cod}
                  />
                  <TextField
                    fullWidth
                    label="Tipo de Informacao"
                    {...getFieldProps('typeOfInformation')}
                    error={Boolean(touched.typeOfInformation && errors.typeOfInformation)}
                    helperText={touched.typeOfInformation && errors.typeOfInformation}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Nome"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  label="Descrição"
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Criar' : 'Salvar Mudanças'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
