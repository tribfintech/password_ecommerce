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

type AttachmentXNewFormProps = {
  isEdit: boolean;
  currentAttachment?: CompanyManager;
};

export default function AttachmentXNewForm({ isEdit, currentAttachment }: AttachmentXNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewAttachmentSchema = Yup.object().shape({
    item: Yup.string().required('Item é obrigatório'),
    cest: Yup.string().required('CEST é obrigatório'),
    ncm: Yup.string().required('NCM é obrigatório'),
    description: Yup.string().required('Descrição é obrigatório'),
    segment: Yup.string().required('Segmento é obrigatório')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      item: currentAttachment?.cod || '',
      cest: currentAttachment?.name || '',
      ncm: currentAttachment?.cnpj || '',
      description: currentAttachment?.email || '',
      segment: currentAttachment?.phoneNumber || ''
    },
    validationSchema: NewAttachmentSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Criado com sucesso' : 'Atualizado com sucesso', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.taxSubstitute.attachmentX);
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
                    sx={{ maxWidth: 300 }}
                    fullWidth
                    label="Item"
                    {...getFieldProps('item')}
                    error={Boolean(touched.item && errors.item)}
                    helperText={touched.item && errors.item}
                  />
                  <TextField
                    fullWidth
                    label="CEST"
                    {...getFieldProps('cest')}
                    error={Boolean(touched.cest && errors.cest)}
                    helperText={touched.cest && errors.cest}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="NCM"
                  {...getFieldProps('ncm')}
                  error={Boolean(touched.ncm && errors.ncm)}
                  helperText={touched.ncm && errors.ncm}
                />

                <TextField
                  fullWidth
                  label="Descrição"
                  multiline
                  minRows={4}
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />

                <TextField
                  fullWidth
                  label="Segmento"
                  {...getFieldProps('segment')}
                  error={Boolean(touched.segment && errors.segment)}
                  helperText={touched.segment && errors.segment}
                />

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Criar Anexo' : 'Salvar Mudanças'}
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
