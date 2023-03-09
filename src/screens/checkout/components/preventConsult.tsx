import { Typography, Grid, TextField, Button, Stack } from "@mui/material";
import { PreventConsultProps } from "../model";
import InputMask from "react-input-mask";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack5";
import { useEffect } from "react";

const PreventConsult: React.FC<PreventConsultProps> = ({
  setCurrentStep,
  makeConsult,
  setMakeConsult,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object().shape({
    CPF: Yup.string().required("O CPF/CNPJ é Obrigatório."),
    DataNascimento: Yup.string().required(
      "A data de Nascimento é Obrigatória."
    ),
  });

  const formik = useFormik({
    // validationSchema,
    initialValues: {
      CPF: "",
      DataNascimento: "",
    },
    onSubmit: async (values) => {
      const isCpf = values.CPF.length <= 14;

      const [day, month, year] = values.DataNascimento.split("/");
      const DataNascimento = `${year}-${month}-${day} `;

      const CPF: string = isCpf
        ? values.CPF.replace(".", "").replace(".", "").replace("-", "")
        : values.CPF.replace(".", "")
            .replace(".", "")
            .replace(".", "")
            .replace("/", "")
            .replace("-", "");

      const payload = {
        CPF: "061.927.721-18",
        DataNascimento: "2003-04-28",
        apiKey: "12567wfrdf47c2843ddb7a9e20d4ew2",
      };

      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify(payload);
      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://apiar.safeweb.com.br/passwordapi/api/vendasportal/ConsultaPrevia/",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then((response: any) => {
          console.log(response.data.IsOK);
          if (response.data.IsOK) {
            enqueueSnackbar("Consulta realizada com Sucesso!", {
              variant: "success",
            });
            setCurrentStep("Identificação");
            return;
          }
          if (response.data.Erro.includes("4")) {
            enqueueSnackbar(
              "Dada de nascimento Incompatível com o CPF informado",
              {
                variant: "error",
              }
            );
            setMakeConsult(false);
            return;
          }
          enqueueSnackbar(response.data.Erro, {
            variant: "error",
          });
          setMakeConsult(false);
        })
        .catch(function (error: any) {
          console.log(error);
          setMakeConsult(false);
        });
    },
  });

  const { handleSubmit, getFieldProps, setFieldValue, errors, touched } =
    formik;

  useEffect(() => {
    if (makeConsult) {
      handleSubmit();
    }
  }, [makeConsult]);

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <Typography variant="h4" fontWeight={700}>
          Para prosseguir, Insira as informações a seguir
        </Typography>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <Grid
            container
            direction="column"
            spacing={2}
            alignItems="center"
            sx={{ mt: 2, width: 400 }}
          >
            <Grid item xs={6} sx={{ width: "100%" }}>
              <InputMask
                mask={
                  formik.getFieldProps("CPF").value.length <= 14
                    ? "999.999.999-999"
                    : "99.999.999/9999-99"
                }
                maskChar=""
                helperText={touched.CPF && errors.CPF}
                error={Boolean(touched.CPF && errors.CPF)}
                {...getFieldProps("CPF")}
              >
                {(inputprops: any) => (
                  <TextField fullWidth label="CPF/CNPJ" {...inputprops} />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} sx={{ width: "100%" }}>
              <InputMask
                mask="99/99/9999"
                maskChar=""
                {...getFieldProps("DataNascimento")}
                error={Boolean(touched.DataNascimento && errors.DataNascimento)}
                helperText={touched.DataNascimento && errors.DataNascimento}
              >
                {(props: any) => (
                  <TextField {...props} fullWidth label="Data de Nascimento" />
                )}
              </InputMask>
            </Grid>
          </Grid>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default PreventConsult;
