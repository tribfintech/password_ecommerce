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
import { CompanyManager } from '../../../@types/company';
// ----------------------------------------------------------------------

type ProductNewFormProps = {
  isEdit: boolean;
  currentProduct?: CompanyManager;
};

export default function ProductNewForm({ isEdit, currentProduct }: ProductNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    product: Yup.string().required('Produto é obrigatório'),
    description: Yup.string().required('Descrição é obrigatório'),
    cnpj: Yup.string().required('CNPJ é obrigatório'),
    typeCalculateProduct: Yup.string().required('Tipo Cálculo Produto é obrigatório'),
    movementType: Yup.string().required('Tipo Movimento é obrigatório'),
    agendaRule: Yup.string().required('Regra de Pauta é obrigatório'),
    agendaRuleGroup: Yup.string().required('Grupo Regra Pauta é obrigatório'),
    agendaDescription: Yup.string().required('Descrição de Pauta é obrigatório'),
    tariffValue: Yup.string().required('Valor de Pauta é obrigatório')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      product: currentProduct?.cod || '',
      description: currentProduct?.name || '',
      cnpj: currentProduct?.cnpj || '',
      typeCalculateProduct: currentProduct?.email || '',
      movementType: currentProduct?.phoneNumber || '',
      agendaRule: currentProduct?.company || '',
      agendaRuleGroup: currentProduct?.isVerified || '',
      agendaDescription: currentProduct?.company || '',
      tariffValue: currentProduct?.company || ''
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Criado com sucesso' : 'Atualizado com sucesso', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.registers.products);
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
                <TextField
                  fullWidth
                  label="Produto"
                  {...getFieldProps('product')}
                  error={Boolean(touched.product && errors.product)}
                  helperText={touched.product && errors.product}
                />
                <TextField
                  fullWidth
                  label="Descrição"
                  multiline
                  rows={4}
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />

                <TextField
                  fullWidth
                  label="CNPJ"
                  {...getFieldProps('cnpj')}
                  error={Boolean(touched.cnpj && errors.cnpj)}
                  helperText={touched.cnpj && errors.cnpj}
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Tipo Cálculo Produto"
                    {...getFieldProps('typeCalculateProduct')}
                    error={Boolean(touched.typeCalculateProduct && errors.typeCalculateProduct)}
                    helperText={touched.typeCalculateProduct && errors.typeCalculateProduct}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Tipo Movimento"
                    {...getFieldProps('movementType')}
                    error={Boolean(touched.movementType && errors.movementType)}
                    helperText={touched.movementType && errors.movementType}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Regra de Pauta"
                    {...getFieldProps('agendaRule')}
                    error={Boolean(touched.agendaRule && errors.agendaRule)}
                    helperText={touched.agendaRule && errors.agendaRule}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Grupo Regra Pauta"
                    {...getFieldProps('agendaRuleGroup')}
                    error={Boolean(touched.agendaRuleGroup && errors.agendaRuleGroup)}
                    helperText={touched.agendaRuleGroup && errors.agendaRuleGroup}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Descrição de Pauta"
                  multiline
                  rows={4}
                  {...getFieldProps('agendaDescription')}
                  error={Boolean(touched.agendaDescription && errors.agendaDescription)}
                  helperText={touched.agendaDescription && errors.agendaDescription}
                />

                <TextField
                  fullWidth
                  label="Valor de Pauta"
                  {...getFieldProps('tariffValue')}
                  error={Boolean(touched.tariffValue && errors.tariffValue)}
                  helperText={touched.tariffValue && errors.tariffValue}
                />

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Criar Produto' : 'Salvar Mudanças'}
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
