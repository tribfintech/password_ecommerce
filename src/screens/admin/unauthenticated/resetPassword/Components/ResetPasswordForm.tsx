// form
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { TextField, Alert, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router';
import { PATH_ADMIN } from 'routes/paths';
// model
import { ResetPasswordFormProps, InitialValues } from '../Model';
// cpf validator function

// ----------------------------------------------------------------------

export default function ResetPasswordForm({ fetchRecovery }: ResetPasswordFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('O E-mail é Obrigatório!').email('O E-mail é deve ser válido!')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await fetchRecovery(values.email);
        const returnMessage = response?.payload?.message || 'Solicitação realizada com sucesso!';

        if (response.meta.requestStatus === 'fulfilled') {
          setSubmitting(false);
          enqueueSnackbar(returnMessage, {
            variant: 'success'
          });
          navigate(PATH_ADMIN.general.home);
        } else {
          setSubmitting(false);
          enqueueSnackbar('Não foi possível recuperar sua senha!', {
            variant: 'error'
          });
        }
      } catch (error) {
        setSubmitting(false);
        setErrors({ afterSubmit: error.message });
        enqueueSnackbar('Ocorreu algum problema, tente novamente mais tarde.', {
          variant: 'error'
        });
      }
    }
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <TextField
            helperText={touched.email && errors.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            {...getFieldProps('email')}
            label="E-mail"
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Recuperar Senha
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
