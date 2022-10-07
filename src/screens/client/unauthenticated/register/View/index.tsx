import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';

import { Form, FormikProvider, useFormik } from 'formik';
import {
  Box,
  Card,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  TextField,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControlLabel,
  Switch
} from '@material-ui/core';

import { LoadingButton } from '@material-ui/lab';
import InputMask from 'react-input-mask';
import { termMock } from 'components/_dashboard/companies/termMock';
import { useEffect, useState } from 'react';
import moment from 'moment';
import LoadingScreen from 'components/LoadingScreen';
import { fetchCreateCompany } from 'services/store/actions/company.action';
import { useAppDispatch } from 'services/request/baseQuery';
import Logo from 'components/Logo';
import { ContentStyle, ContentStyleLoading, RootStyle } from './styles';
import { RegisterProps } from '../Model';

const View: React.FC<RegisterProps> = ({ dataCnpj, loading, dataAutocomplete }) => {
  const dispatch = useAppDispatch();
  const { set } = dataCnpj;

  const { enqueueSnackbar } = useSnackbar();

  // icmsWithinTheState: Yup.boolean().oneOf(
  //   [true],
  //   'Calcula ICMS ST dentro do estado é obrigatório'
  // ),
  // ordinance195Granted: Yup.boolean().oneOf([true], 'Portaria 195 Outorgado é obrigatório'),
  // limitICMSRate: Yup.boolean().oneOf(
  //   [true],
  //   'Limitar alíquota ICMS até 7% (Parágrafo 2º, Artigo 1º) é obrigatório'
  // ),

  const NewCompanySchema = Yup.object().shape({
    company: Yup.string().required('Razão Social é obrigatório'),
    companyName: Yup.string().required('Nome Fantasia é obrigatório'),
    cnpj: Yup.string().required('CNPJ é obrigatório'),
    regimeTax: Yup.string().required('Regime Tributário é obrigatório'),
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().required('E-mail é obrigatório').email(),
    confirmEmail: Yup.string()
      .required('Reinsira o E-mail')
      .email()
      .oneOf([Yup.ref('email')], 'O Email deve ser idêntico.'),
    phoneNumber: Yup.string(),
    cellNumber: Yup.string().required('Informar um celular para contato é obrigatório.'),
    emailNfe: Yup.string().required('E-mail Nfe é Obrigatória'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(8, 'A senha é muito curta, insira no mínimo 8 caracteres.'),
    passwordConfirm: Yup.string()
      .required('Reinsira a senha.')
      .oneOf([Yup.ref('password')], 'A senhas devem ser idênticas.'),
    arrived: Yup.string().required('Informar como chegou é obrigatório.'),
    ie: Yup.string().required('Informar o I.E é obrigatório'),
    icms: Yup.string().required('Informar o ICMS é obrigatório')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cod: '',
      company: '',
      companyName: '',
      cnpj: '',
      tax: 'simpleNational' || 'presumedProfit' || 'realProfit',
      icmsWithinTheState: false,
      ordinance195Granted: false,
      limitICMSRate: false,
      name: '',
      email: '',
      emailNfe: '',
      confirmEmail: '',
      phoneNumber: '',
      cellNumber: '',
      number: '',
      complemento: '',
      bairro: '',
      password: '',
      passwordConfirm: '',
      zipCode: '',
      regimeTax: '',
      dateIn: '',
      ie: '',
      icms: '',
      address: '',
      city: '',
      state: '',
      mei: false,
      arrived: ''
    },
    validationSchema: NewCompanySchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const date = values.dateIn.split('/');

      const payload = {
        cnpj: values.cnpj,
        razao: values.company,
        fantasia: values.companyName,
        endereco: values.address,
        numero: values.number,
        complemento: values.complemento,
        cep: values.zipCode,
        bairro: values.bairro,
        cidade: values.city,
        estado: values.state,
        regime_tributario: values.regimeTax,
        contribuinte_icms: values.icms,
        fundado_em: moment(`${date[2]}-${date[1]}-${date[0]}`).format('YYYY-MM-DD'),
        email_cnpj: values.emailNfe,
        mei: values.mei,
        nome_contato: values.name,
        telefone_celular: values.phoneNumber,
        email_contato: values.email,
        senha: values.password,
        chegou_via: values.arrived,
        aceite_termos: true,
        ie: values.ie,
        telefone_fixo: values.phoneNumber
      };

      try {
        const response = await dispatch(fetchCreateCompany(payload));
        const { requestStatus } = response.meta;

        if (requestStatus === 'fulfilled') {
          enqueueSnackbar('Cadastro efetuado com sucesso!', {
            variant: 'success'
          });
        } else {
          enqueueSnackbar('Ocorreu um problema.', {
            variant: 'error'
          });
        }
      } catch (error) {
        console.log('Error', error);
        setSubmitting(false);
        setErrors(error);
        enqueueSnackbar('Ocorreu um problema.', {
          variant: 'error'
        });
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const dropTributacao = ['Simples Nacional', 'Lucro Presumido', 'Lucro Real'];
  const dropContribuente = ['Contribuinte', 'Contribuinte Isento', 'Não contribuinte'];
  const dropIe = ['Contribuinte', 'Contribuinte Isento'];
  const questRed = ['Anúncios Patrocinados', 'Facebook', 'Google', 'Instagram', 'Outdoor'];

  const currentCnpj: string = formik.getFieldProps('cnpj').value;

  useEffect(() => {
    set(currentCnpj);
  }, [currentCnpj]);

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

    formik.setFieldValue('company', dataAutocomplete?.razao_social);
    formik.setFieldValue(
      'companyName',
      dataAutocomplete?.estabelecimento?.nome_fantasia
        ? dataAutocomplete?.estabelecimento?.nome_fantasia
        : dataAutocomplete?.razao_social
    );
    formik.setFieldValue('emailNfe', dataAutocomplete?.estabelecimento?.email);
    formik.setFieldValue('address', dataAutocomplete?.estabelecimento?.logradouro);
    formik.setFieldValue('country', dataAutocomplete?.estabelecimento?.bairro);
    formik.setFieldValue('zipCode', dataAutocomplete?.estabelecimento?.cep);
    formik.setFieldValue('state', dataAutocomplete?.estabelecimento?.estado?.sigla);
    formik.setFieldValue('city', dataAutocomplete?.estabelecimento?.cidade?.nome);
    formik.setFieldValue('number', dataAutocomplete?.estabelecimento?.numero);
    formik.setFieldValue('complemento', dataAutocomplete?.estabelecimento?.complemento);
    formik.setFieldValue('bairro', dataAutocomplete?.estabelecimento?.bairro);

    if (dataAutocomplete?.simples?.mei === 'Sim') {
      setvmei(true);
      formik.setFieldValue('mei', true);
    }

    if (dataAutocomplete?.estabelecimento?.data_inicio_atividade) {
      formik.setFieldValue(
        'dateIn',
        moment(dataAutocomplete?.estabelecimento?.data_inicio_atividade).format('DD/MM/YYYY')
      );
    }

    if (dataAutocomplete?.simples?.simples === 'Sim') {
      formik.setFieldValue('regimeTax', 'Simples Nacional');
    }
  }, [dataAutocomplete]);

  if (loading) {
    return (
      <RootStyle title="Cadastrar-se na TRIB">
        <Container>
          <ContentStyleLoading>
            <Stack direction="column" alignItems="center" sx={{ mb: 5 }}>
              <Logo sx={{ width: 300, height: 300, alignSelf: 'center' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ color: 'text.secondary' }}>Cadastre sua Empresa</Typography>
              </Box>
            </Stack>
            <FormikProvider value={formik}>
              <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <Stack spacing={3}>
                        <LoadingScreen />
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>
          </ContentStyleLoading>
        </Container>
      </RootStyle>
    );
  }

  return (
    <RootStyle title="Cadastrar-se na TRIB">
      <Container>
        <ContentStyle>
          <Stack direction="column" alignItems="center" sx={{ mb: 5 }}>
            <Logo sx={{ width: 150, height: 150, alignSelf: 'center' }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ color: 'text.secondary' }}>Cadastre sua Empresa</Typography>
            </Box>
          </Stack>
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
                          {(inputProps: any) => (
                            <TextField {...inputProps} fullWidth label="CNPJ" />
                          )}
                        </InputMask>

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
                          label="CEP"
                          {...getFieldProps('zipCode')}
                          disabled
                        />
                        <TextField
                          sx={{ width: 550 }}
                          fullWidth
                          label="Endereço (Rua)"
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
                          onChange={(event, value) => formik.setFieldValue('regimeTax', value)}
                          renderInput={(regimeTaxProp: any) => (
                            <TextField
                              {...regimeTaxProp}
                              label="Regime Tributário"
                              error={Boolean(touched.regimeTax && errors.regimeTax)}
                            />
                          )}
                        />
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={dropContribuente}
                          sx={{ width: 600 }}
                          {...getFieldProps('icms')}
                          onChange={(event, value) => formik.setFieldValue('icms', value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Contribuinte ICMS"
                              error={Boolean(touched.icms && errors.icms)}
                            />
                          )}
                        />
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={dropIe}
                          sx={{ width: 600 }}
                          {...getFieldProps('ie')}
                          onChange={(event, value) => formik.setFieldValue('ie', value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Inscrição Estadual"
                              value={inscEst}
                              onChange={(event) => setInscEst(event.target.value)}
                              error={Boolean(touched.ie && errors.ie)}
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
                        <InputMask
                          mask="(99)9999-9999"
                          disabled={false}
                          maskChar=" "
                          {...getFieldProps('phoneNumber')}
                          error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                        >
                          {(inputprops: any) => (
                            <TextField fullWidth label="Telefone Fixo" {...inputprops} />
                          )}
                        </InputMask>
                        <InputMask
                          mask="(99)9 9999-9999"
                          disabled={false}
                          maskChar=" "
                          {...getFieldProps('cellNumber')}
                          error={Boolean(touched.cellNumber && errors.cellNumber)}
                        >
                          {(inputProps: any) => (
                            <TextField fullWidth label="Celular" {...inputProps} />
                          )}
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
                          {...getFieldProps('arrived')}
                          onChange={(event, value) => formik.setFieldValue('arrived', value)}
                          renderInput={(params) => (
                            <TextField {...params} label="Onde nos encontrou" />
                          )}
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
                            Enviar Cadastro
                          </LoadingButton>
                        </Box>
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default View;
