import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import InputMask from 'react-input-mask';
import moment from 'moment';

// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  TextFieldProps,
  Autocomplete,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  Switch,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  DialogContent
} from '@material-ui/core';
// utils
import { useEffect, useRef, useState } from 'react';
import LoadingScreen from 'components/LoadingScreen';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { CompanyManager } from '../../../@types/company';
import { termMock } from './termMock';
// ----------------------------------------------------------------------

type CompanyNewFormProps = {
  isEdit: boolean;
  currentCompany?: CompanyManager;
  dataCnpj: {
    set: any;
  };
  autocomplete: any;
  loading: boolean;
};

export default function CompanyNewForm({
  isEdit,
  currentCompany,
  dataCnpj,
  autocomplete,
  loading
}: CompanyNewFormProps) {
  const { set } = dataCnpj;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewCompanySchema = Yup.object().shape({
    cod: Yup.string().required('Código é obrigatório'),
    company: Yup.string().required('Razão Social é obrigatório'),
    companyName: Yup.string().required('Nome Fantasia é obrigatório'),
    cnpj: Yup.string().required('CNPJ é obrigatório'),
    regimeTax: Yup.string().required('Regime Tributário é obrigatório'),
    icmsWithinTheState: Yup.boolean().oneOf(
      [true],
      'Calcula ICMS ST dentro do estado é obrigatório'
    ),
    ordinance195Granted: Yup.boolean().oneOf([true], 'Portaria 195 Outorgado é obrigatório'),
    limitICMSRate: Yup.boolean().oneOf(
      [true],
      'Limitar alíquota ICMS até 7% (Parágrafo 2º, Artigo 1º) é obrigatório'
    ),
    name: Yup.string().required('Nome é obrigatório'),
    phoneNumber: Yup.string().required('Telefone é obrigatório'),
    cellNumber: Yup.string().required('Celular é obrigatório'),
    email: Yup.string().required('E-mail é obrigatório').email(),
    confirmEmail: Yup.string()
      .required('Reinsira o E-mail')
      .email()
      .oneOf([Yup.ref('email')], 'O Email deve ser idêntico.'),
    pass: Yup.string().required('Senha é Obrigatória'),
    emailNfe: Yup.string().required('E-mail Nfe é Obrigatória'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(8, 'A senha é muito curta, insira no mínimo 8 caracteres.'),
    passwordConfirm: Yup.string()
      .required('Reinsira a senha.')
      .oneOf([Yup.ref('password')], 'A senhas devem ser idênticas.')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cod: currentCompany?.cod || '',
      company: currentCompany?.company || '',
      companyName: currentCompany?.companyName || '',
      cnpj: currentCompany?.cnpj || '',
      tax: currentCompany?.company || 'simpleNational' || 'presumedProfit' || 'realProfit',
      icmsWithinTheState: false,
      ordinance195Granted: false,
      limitICMSRate: false,
      name: currentCompany?.name || '',
      email: currentCompany?.email || '',
      emailNfe: currentCompany?.emailNfe || '',
      confirmEmail: currentCompany?.confirmEmail || '',
      phoneNumber: currentCompany?.phoneNumber || '',
      cellNumber: currentCompany?.cellNumber || '',
      number: currentCompany?.number || '',
      complemento: currentCompany?.complemento || '',
      bairro: currentCompany?.bairro || '',
      password: currentCompany?.password || '',
      passwordConfirm: currentCompany?.passwordConfirm || '',
      zipCode: currentCompany?.zipCode || '',
      regimeTax: currentCompany?.regimeTax || '',
      dateIn: currentCompany?.dateIn || '',
      ie: currentCompany?.ie || ''
    },
    validationSchema: NewCompanySchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Criado com sucesso' : 'Atualizado com sucesso', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.registers.companies);
      } catch (error: any) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const dropTributacao = ['Simples Nacional', 'Lucro Presumido', 'Lucro Real'];
  const dropContribuente = ['Contribuinte', 'Contribuinte Isento', 'Não contribuinte'];
  const dropIe = ['Contribuinte', 'Contribuinte Isento'];
  const questRed = ['Anúncios Patrocinados', 'Facebook', 'Google', 'Instagram', 'Outdoor'];

  const currentCnpj = formik.getFieldProps('cnpj').value;
  useEffect(() => {
    set(currentCnpj);
  }, [currentCnpj, set]);

  // formik.setFieldValue('model', autocomplete?.porte?.descricao); // "Micro Empresa"
  // formik.setFieldValue('regimeTax', autocomplete?.simples?.simples); // "Sim"

  const [check, setCheck] = useState(false);
  const [termModal, setTermModal] = useState(false);
  const [vmei, setvmei] = useState(false);
  const [inscEst, setInscEst] = useState('');

  useEffect(() => {
    formik.setFieldValue('ie', inscEst);
  }, [inscEst]);

  useEffect(() => {
    // clear temp
    formik.setFieldValue('regimeTax', '');
    // end clear temp

    formik.setFieldValue('company', autocomplete?.razao_social);
    formik.setFieldValue(
      'companyName',
      autocomplete?.estabelecimento?.nome_fantasia || autocomplete?.razao_socia
    );
    formik.setFieldValue('emailNfe', autocomplete?.estabelecimento?.email);
    formik.setFieldValue('address', autocomplete?.estabelecimento?.logradouro);
    formik.setFieldValue('country', autocomplete?.estabelecimento?.bairro);
    formik.setFieldValue('zipCode', autocomplete?.estabelecimento?.cep);
    formik.setFieldValue('state', autocomplete?.estabelecimento?.estado?.sigla);
    formik.setFieldValue('city', autocomplete?.estabelecimento?.cidade?.nome);
    formik.setFieldValue('city', autocomplete?.estabelecimento?.cidade?.nome);
    formik.setFieldValue('number', autocomplete?.estabelecimento?.numero);
    formik.setFieldValue('complemento', autocomplete?.estabelecimento?.complemento);
    formik.setFieldValue('bairro', autocomplete?.estabelecimento?.bairro);

    if (autocomplete?.simples?.mei === 'Sim') {
      setvmei(true);
      formik.setFieldValue('mei', true);
    }

    if (autocomplete?.estabelecimento?.data_inicio_atividade) {
      formik.setFieldValue(
        'dateIn',
        moment(autocomplete?.estabelecimento?.data_inicio_atividade).format('DD/MM/YYYY')
      );
    }

    if (autocomplete?.simples?.simples === 'Sim') {
      formik.setFieldValue('regimeTax', 'Simples Nacional');
    }
  }, [autocomplete]);

  if (loading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <LoadingScreen />
            </Stack>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <InputMask
                    mask="99.999.999/9999-99"
                    disabled={false}
                    maskChar=" "
                    {...getFieldProps('cnpj')}
                  >
                    {(inputProps: any) => <TextField {...inputProps} fullWidth label="CNPJ" />}
                  </InputMask>
                  {/* <TextField
                    fullWidth
                    label="CNPJ"
                    {...getFieldProps('cnpj')}
                    error={Boolean(touched.cnpj && errors.cnpj)}
                    helperText={touched.cnpj && errors.cnpj}
                  /> */}
                  <TextField
                    fullWidth
                    label="Razão Social"
                    {...getFieldProps('company')}
                    error={Boolean(touched.company && errors.company)}
                    helperText={touched.company && errors.company}
                    disabled
                  />
                </Stack>
                <TextField
                  fullWidth
                  label="Nome Fantasia"
                  disabled
                  {...getFieldProps('companyName')}
                  error={Boolean(touched.companyName && errors.companyName)}
                  helperText={touched.companyName && errors.companyName}
                />
                <Typography variant="h5">Endereço</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                  <TextField
                    sx={{ width: 550 }}
                    fullWidth
                    label="Cep"
                    {...getFieldProps('zipCode')}
                    disabled
                  />
                  <TextField
                    sx={{ width: 550 }}
                    fullWidth
                    label="Endereço(Rua)"
                    {...getFieldProps('address')}
                    disabled
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                  <TextField
                    sx={{ width: 550 }}
                    fullWidth
                    label="Número"
                    {...getFieldProps('number')}
                    disabled
                  />
                  <TextField
                    sx={{ width: 550 }}
                    fullWidth
                    label="Complemento"
                    {...getFieldProps('complemento')}
                    disabled
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                  <TextField
                    sx={{ width: 820 }}
                    fullWidth
                    label="Bairro"
                    {...getFieldProps('bairro')}
                    disabled
                  />
                  <TextField
                    sx={{ width: 600 }}
                    fullWidth
                    label="Cidade"
                    {...getFieldProps('city')}
                    disabled
                  />
                  <TextField
                    sx={{ width: 200 }}
                    label="Estado"
                    {...getFieldProps('state')}
                    disabled
                  />
                </Stack>
                <Typography variant="h5">Fiscal</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={dropTributacao}
                    sx={{ width: 600 }}
                    {...getFieldProps('regimeTax')}
                    renderInput={(regimeTaxProp: any) => (
                      <TextField {...regimeTaxProp} label="Regime Tributário" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={dropContribuente}
                    sx={{ width: 600 }}
                    renderInput={(params) => <TextField {...params} label="Contribuinte ICMS" />}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={dropIe}
                    sx={{ width: 600 }}
                    {...getFieldProps('ie')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Inscrição Estadual"
                        value={inscEst}
                        onChange={(event) => setInscEst(event.target.value)}
                      />
                    )}
                  />
                </Stack>{' '}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                  <TextField
                    sx={{ width: 360 }}
                    fullWidth
                    label="Data de Fundação"
                    {...getFieldProps('dateIn')}
                    disabled
                  />
                  <TextField
                    sx={{ width: 355 }}
                    fullWidth
                    label="E-mail para envio de NFe"
                    {...getFieldProps('emailNfe')}
                    error={Boolean(touched.emailNfe && errors.emailNfe)}
                    helperText={touched.emailNfe && errors.emailNfe}
                  />
                  <FormControlLabel
                    {...getFieldProps('mei')}
                    checked={vmei}
                    onChange={() => setvmei(!vmei)}
                    control={<Switch />}
                    label="Microempreendedor individual (MEI)"
                  />
                </Stack>
                <Typography variant="h5">Contato</Typography>
                <TextField
                  fullWidth
                  label="Nome completo"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="E-mail"
                    placeholder="Exemplo@Trib"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Confirmação de E-mail"
                    placeholder="Exemplo@Trib"
                    {...getFieldProps('confirmEmail')}
                    error={Boolean(touched.confirmEmail && errors.confirmEmail)}
                    helperText={touched.confirmEmail && errors.confirmEmail}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                  <InputMask mask="(99)9999-9999" disabled={false} maskChar=" ">
                    {() => <TextField fullWidth label="Telefone Fixo" />}
                  </InputMask>
                  <InputMask mask="(99)9 9999-9999" disabled={false} maskChar=" ">
                    {() => <TextField fullWidth label="Celular" />}
                  </InputMask>
                </Stack>
                <Typography variant="h5">Acesso</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Senha"
                    {...getFieldProps('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirme a Senha"
                    {...getFieldProps('passwordConfirm')}
                    error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                    helperText={touched.passwordConfirm && errors.passwordConfirm}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={questRed}
                    sx={{ width: 550 }}
                    renderInput={(params) => <TextField {...params} label="Onde nos encontrou" />}
                  />
                </Stack>
                <Stack
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 2 }}
                >
                  <Button
                    variant="contained"
                    color="inherit"
                    type="button"
                    onClick={() => setTermModal(true)}
                  >
                    Termos de Uso
                  </Button>

                  {/* <FormControlLabel
                    control={<Checkbox />}
                    value={check}
                    onChange={() => setTermModal(true)}
                    label="Aceitar Termos"
                  /> */}
                  <Dialog
                    open={termModal}
                    onClose={() => setTermModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">Termos de Uso</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {termMock.split('\n').map((el, key) => (
                          <div style={{ marginBottom: 3 }} key={key}>
                            {el}
                          </div>
                        ))}
                      </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                      <Button
                        onClick={() => {
                          setTermModal(false);
                          setCheck(false);
                        }}
                      >
                        Não concordo
                      </Button>
                      <Button
                        onClick={() => {
                          setCheck(true);
                          setTermModal(false);
                        }}
                        autoFocus
                      >
                        Concordo
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Box sx={{ mt: 3, display: 'flex' }}>
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      loading={isSubmitting}
                      disabled={!check}
                    >
                      {!isEdit ? 'Enviar Cadastro' : 'Salvar Mudanças'}
                    </LoadingButton>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
