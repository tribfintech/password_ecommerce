import { Grid, TextField, Typography } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import { IdentificationProps } from "../model";

const Identification: React.FC<IdentificationProps> = () => {
  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {
      cpf: "",
      name: "",
      email: "",
      cep: "",
      public_place: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      uf: "",
      birthday: "",
      cellphone: "",
    },
    validationSchema,
    onSubmit: (values) => console.log("consulta realizada", values),
  });

  const { getFieldProps, setFieldValue, handleSubmit, errors, touched } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Grid container direction="column" spacing={1} sx={{ width: "100%" }}>
          <Grid xs={12} alignSelf="start">
            <Typography variant="h4">Identificação do Titular</Typography>
          </Grid>
          <Grid item container direction="row" spacing={2}>
            <Grid item xs={6}>
              <InputMask
                mask={
                  formik.getFieldProps("cpf").value.length <= 14
                    ? "999.999.999-999"
                    : "99.999.999/9999-99"
                }
                maskChar=""
                helperText={touched.cpf && errors.cpf}
                error={Boolean(touched.cpf && errors.cpf)}
                {...getFieldProps("cpf")}
              >
                {(inputprops: any) => (
                  <TextField fullWidth label="CPF" {...inputprops} />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={6}>
              <InputMask
                mask="99/99/9999"
                maskChar=""
                {...getFieldProps("birthday")}
                error={Boolean(touched.birthday && errors.birthday)}
                helperText={touched.birthday && errors.birthday}
              >
                {(props: any) => (
                  <TextField {...props} fullWidth label="Data de Nascimento" />
                )}
              </InputMask>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={2}>
            <Grid item xs={6}>
              <TextField label="Nome" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="E-mail" />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <InputMask
              mask=""
              maskChar=""
              {...getFieldProps("cellphone")}
              error={Boolean(touched.cellphone && errors.cellphone)}
              helperText={touched.cellphone && errors.cellphone}
            >
              {(props: any) => <TextField {...props} fullWidth label="CEP" />}
            </InputMask>
          </Grid>
          <Grid>
            <Typography variant="h4">Endereço</Typography>
          </Grid>
          <Grid item container direction="row" spacing={2}>
            <Grid item xs={6}>
              <InputMask
                mask=""
                maskChar=""
                {...getFieldProps("cep")}
                error={Boolean(touched.cep && errors.cep)}
                helperText={touched.cep && errors.cep}
              >
                {(props: any) => <TextField {...props} fullWidth label="CEP" />}
              </InputMask>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Logradouro" />
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={2}>
            <Grid item xs={6}>
              <InputMask
                mask=""
                maskChar=""
                {...getFieldProps("neighborhood")}
                error={Boolean(touched.neighborhood && errors.neighborhood)}
                helperText={touched.neighborhood && errors.neighborhood}
              >
                {(props: any) => (
                  <TextField {...props} fullWidth label="Bairro" />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Número" />
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Complemento" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Estado" />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Cidade" />
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default Identification;
