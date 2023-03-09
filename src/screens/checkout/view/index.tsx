// react
import { useRef, useState } from "react";

// StepComponents
import Cart from "../components/cart";
import PreventConsult from "../components/preventConsult";

import {
  Box,
  Card,
  Typography,
  Stack,
  Container,
  Button,
  Divider,
  TextField,
  Grid,
  InputAdornment,
} from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Stepper from "../components/stepper";
import { RootStyle } from "./styles";
import { CheckoutViewProps } from "../model";
import Identification from "../components/identification";

const View: React.FC<CheckoutViewProps> = ({ steps, checkout }) => {
  const [currentStep, setCurrentStep] = useState("Carrinho");
  const [makeConsult, setMakeConsult] = useState(false);
  const isConsult = currentStep === "Consulta Prévia";
  const isCart = currentStep === "Carrinho";
  const isIdentification = currentStep === "Identificação";

  const handleNextStep = () => {
    if (isConsult) {
      setMakeConsult(true);
      return;
    }
    steps.forEach((step, index) => {
      if (step === currentStep) {
        setCurrentStep(steps[index + 1]);
      }
    });
  };

  const handleBackStep = () => {
    steps.forEach((step, index) => {
      if (step === currentStep) {
        setCurrentStep(steps[index - 1]);
      }
    });
  };

  return (
    <RootStyle>
      <Container
        id="general-container"
        sx={{
          maxWidth: "xl",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <HeaderBreadcrumbs
          heading="Checkout"
          links={[
            { name: "Home" },
            { name: "Adquirir Certificado" },
            { name: "Checkout" },
          ]}
          sx={{ margin: 0, padding: 0 }}
        />
        <Grid container spacing={3} direction="column">
          <Grid item container direction="row" spacing={3}>
            <Grid item md={8} xl={8} direction="column">
              <Stack direction="column" spacing={5} sx={{ width: "100%" }}>
                <Stepper {...{ steps, currentStep }} />
                <Card
                  id="cart"
                  sx={{
                    width: "100%",
                    height: "auto",
                    minHeight: 450,
                    padding: isCart
                      ? `${8}px ${0}px`
                      : `${24}px ${24}px ${24}px`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // justifyContent: 'center'
                  }}
                >
                  {isCart && <Cart {...{ checkout }} />}
                  {isConsult && (
                    <PreventConsult
                      {...{ setCurrentStep, makeConsult, setMakeConsult }}
                    />
                  )}
                  {isIdentification && <Identification />}
                </Card>
              </Stack>
            </Grid>

            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              md={4}
              sm={5}
              spacing={3}
              sx={{ maxHeight: 400 }}
            >
              <Grid item xs={12}>
                <Card
                  sx={{
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: 3,
                    minWidth: 300,
                    marginTop: "100px",
                  }}
                >
                  <Typography fontWeight={700} fontSize="1.125rem" noWrap>
                    Resumo da Compra
                  </Typography>
                  <Stack sx={{ width: "100%", gap: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        fontWeight={400}
                        color=" rgb(99, 115, 129)"
                        fontSize="0.875rem"
                      >
                        Sub Total
                      </Typography>
                      <Typography fontWeight={600} fontSize="0.875rem">
                        Preço
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        fontWeight={400}
                        color=" rgb(99, 115, 129)"
                        fontSize="0.875rem"
                      >
                        Desconto
                      </Typography>
                      <Typography fontWeight={600} fontSize="0.875rem">
                        -
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography fontWeight={600} fontSize="1rem">
                        Total
                      </Typography>
                      <Typography fontWeight={600} fontSize="1rem">
                        Preço
                      </Typography>
                    </Box>
                  </Stack>

                  <TextField
                    label="Cupom de Desconto"
                    sx={{ minWidth: 240 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button>Aplicar</Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleNextStep}
                  size="large"
                  variant="contained"
                  fullWidth
                >
                  Prosseguir
                </Button>
                <Button
                  sx={{ mt: 1 }}
                  onClick={handleBackStep}
                  size="large"
                  variant="contained"
                  fullWidth
                >
                  voltar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
};

export default View;
