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

type SegmentNewFormProps = {
  isEdit: boolean;
  currentSegment?: CompanyManager;
};

export default function SegmentNewForm({ isEdit, currentSegment }: SegmentNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewSegmentSchema = Yup.object().shape({
    item: Yup.string().required('Item é obrigatório'),
    segment: Yup.string().required('Segmento é obrigatório'),
    name: Yup.string().required('Nome é obrigatório')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      item: currentSegment?.cod || '',
      segment: currentSegment?.name || '',
      name: currentSegment?.cnpj || ''
    },
    validationSchema: NewSegmentSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Criado com sucesso' : 'Atualizado com sucesso', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.taxSubstitute.segments);
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
                  label="Item"
                  {...getFieldProps('item')}
                  error={Boolean(touched.item && errors.item)}
                  helperText={touched.item && errors.item}
                />

                <TextField
                  fullWidth
                  label="Segmento"
                  multiline
                  minRows={4}
                  {...getFieldProps('segment')}
                  error={Boolean(touched.segment && errors.segment)}
                  helperText={touched.segment && errors.segment}
                />

                <TextField
                  fullWidth
                  label="Nome"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Criar Segmento' : 'Salvar Mudanças'}
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
