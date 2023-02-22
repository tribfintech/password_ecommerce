import {
  Autocomplete,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { CertificateProps, HomeViewProps } from "../model";
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { makeCheckout } from "services/password-store/checkoutSlice";

const View: React.FC<HomeViewProps> = () => {
  const dispatch = useDispatch()

  const validateSchema = Yup.object().shape({
    product: Yup.string().nullable().required("O tipo do produto é Obrigatório."),
    model: Yup.string().nullable().required("O modelo do certificado é Obrigatório."),
    media: Yup.string().nullable().required("O tipo da Mídia é Obrigatório."),
    validity: Yup.string().nullable().required("O tempo de Validade é Obrigatório."),
    emission: Yup.string().nullable().required("O tipo de emissão é Obrigatório."),
  });

  const formik = useFormik({
    validationSchema: validateSchema,
    initialValues: {
      product: "",
      model: "",
      media: "",
      validity: "",
      emission: "",
    },
    onSubmit: (values) => handleCheckout(values),
  });
  
  const handleCheckout = (values: CertificateProps) => {
    dispatch(makeCheckout(values));
  }

  const { getFieldProps, setFieldValue, errors, touched } = formik;
  const a1MediaOption = ["Arquivo"];
  const a3MediaOptions = ["Token", "Cartão", "Safe-ID", "Sem mídia"];

  const defaultValidities = ["1 Ano", "2 Anos", "3 Anos"];
  const safeIdValidities = ["4 Meses", "1 Ano", "2 Anos", "3 Anos"];

  const isA1: boolean = getFieldProps("model").value === "A1";
  const isSafeId: boolean = getFieldProps("media").value === "Safe-ID";

  useEffect(() => {
    if (isA1) {
      setFieldValue("media", "Arquivo");
      setFieldValue("validity", "1 Ano");
      return;
    }
    if (getFieldProps("media").value === "Arquivo") {
      setFieldValue("media", "");
    }
  }, [isA1]);

  useEffect(() => {
    if (isSafeId && (getFieldProps("validity").value === "4 Meses")) {
      setFieldValue("validity", "");
      return
    }
    if(getFieldProps("validity").value === "4 Meses") {
      setFieldValue("validity", "");
    }
  }, [isSafeId]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Container
          sx={{
            width: "100%",
            height: "auto",
            boxSizing: "border-box",
            pt: 30,
          }}
        >
          <Grid
            id="first"
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={12}
            sx={{
              width: "100%",
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h3">
                Compre ou renove seu Certificado Digital
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              spacing={3}
              xs={12}
            >
              <Grid item xs={2}>
                <Autocomplete
                  {...getFieldProps("product")}
                  onChange={(event, value) => setFieldValue("product", value)}
                  options={["e-CPF", "e-CNPJ"]}
                  getOptionLabel={(option) => option}
                  renderInput={(props) => (
                    <TextField
                      label="Produto"
                      {...props}
                      fullWidth
                      error={Boolean(touched.product && errors.product)}
                      helperText={touched.product && errors.product}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Autocomplete
                  {...getFieldProps("model")}
                  onChange={(event, value) => setFieldValue("model", value)}
                  options={["A1", "A3"]}
                  renderInput={(props) => (
                    <TextField
                      label="Modelo"
                      {...props}
                      fullWidth
                      error={Boolean(touched.model && errors.model)}
                      helperText={touched.model && errors.model}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Autocomplete
                  {...getFieldProps("media")}
                  onChange={(event, value) => setFieldValue("media", value)}
                  disabled={isA1}
                  options={isA1 ? a1MediaOption : a3MediaOptions}
                  renderInput={(props) => (
                    <TextField
                      label="Mídia"
                      {...props}
                      fullWidth
                      error={Boolean(touched.media && errors.media)}
                      helperText={touched.media && errors.media}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Autocomplete
                  {...getFieldProps("validity")}
                  onChange={(event, value) => setFieldValue("validity", value)}
                  disabled={isA1}
                  options={isSafeId ? safeIdValidities : defaultValidities}
                  renderInput={(props) => (
                    <TextField
                      label="Validade"
                      {...props}
                      fullWidth
                      error={Boolean(touched.validity && errors.validity)}
                      helperText={touched.validity && errors.validity}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  {...getFieldProps("emission")}
                  onChange={(event, value) => setFieldValue("emission", value)}
                  options={[
                    "Presencial",
                    "Videoconfêrencia",
                    "Renovação Presencial",
                    "Renovação por Videoconferência",
                  ]}
                  renderInput={(props) => (
                    <TextField
                      label="Emissão"
                      {...props}
                      fullWidth
                      error={Boolean(touched.emission && errors.emission)}
                      helperText={touched.emission && errors.emission}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2} sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  size="medium"
                  fullWidth
                  variant="contained"
                >
                  Prosseguir
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Form>
    </FormikProvider>
  );
};

export default View;
