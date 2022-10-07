import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';

import { Form, FormikProvider, useFormik } from 'formik';
import {
  Box,
  Card,
  Container,
  Typography,
  Grid,
  Stack,
  TextField,
  Autocomplete,
  FormControlLabel,
  Switch,
  Button
} from '@material-ui/core';

import { LoadingButton } from '@material-ui/lab';
import InputMask from 'react-input-mask';
import { termMock } from 'components/_dashboard/companies/termMock';
import { useEffect, useState } from 'react';
import moment from 'moment';
import LoadingScreen from 'components/LoadingScreen';
import { fetchCreateCompanyAdmin, UpdateCompany } from 'services/store/actions/company.action';
import { useAppDispatch } from 'services/request/baseQuery';
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_ADMIN } from 'routes/paths';
import { useNavigate } from 'react-router';
import { RegisterProps } from '../Model';

const View: React.FC<RegisterProps> = ({ dataCnpj, loading, dataAutocomplete, typePage }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    ie: Yup.string(),
    icms: Yup.string().required('Informar o ICMS é obrigatório')
  });

  const UpdateCompanySchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().required('E-mail é obrigatório').email(),
    confirmEmail: Yup.string()
      .required('Reinsira o E-mail')
      .email()
      .oneOf([Yup.ref('email')], 'O Email deve ser idêntico.'),
    phoneNumber: Yup.string(),
    cellNumber: Yup.string().required('Informar um celular para contato é obrigatório.'),
    emailNfe: Yup.string().required('E-mail Nfe é Obrigatória'),
    arrived: Yup.string().required('Informar como chegou é obrigatório.'),
    status: Yup.string().required('Informar o Status é obrigatório.')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cod: '',
      company: '',
      companyName: '',
      cnpj: '',
      tax: 'Simples Nacional' || 'Lucro Presumido' || 'Lucro Real',
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
      arrived: '',
      status: '',
      validRegister: false
    },
    validationSchema: typePage === 'New' ? NewCompanySchema : UpdateCompanySchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (typePage === 'New') {
        const date = values.dateIn.split('/');

        const payload = {
          cnpj: values.cnpj,
          razao: values.company,
          fantasia: values.companyName,
          endereco: values.address,
          numero: values.number,
          complemento: values.complemento,
          bairro: values.bairro,
          cidade: values.city,
          estado: values.state,
          regime_tributario: values.regimeTax,
          contribuinte_icms: values.icms,
          fundado_em: moment(`${date[2]}-${date[1]}-${date[0]}`).format('YYYY-MM-DD'),
          email_cnpj: values.emailNfe,
          mei: values.mei,
          nome_contato: values.name,
          telefone_celular: values.cellNumber,
          email_contato: values.email,
          senha: values.password,
          chegou_via: values.arrived,
          aceite_termos: true,
          ie: values.ie,
          telefone_fixo: values.phoneNumber,
          cep: values.zipCode,
          ativo: true,
          grupo_permissao: 1
        };

        try {
          const response = await dispatch(fetchCreateCompanyAdmin(payload));
          const { requestStatus } = response.meta;

          if (requestStatus === 'fulfilled') {
            enqueueSnackbar('Cadastro efetuado com sucesso!', {
              variant: 'success'
            });
            navigate(PATH_ADMIN.general.management.companies);
          } else {
            enqueueSnackbar('Ocorreu um problema.', {
              variant: 'error'
            });
          }
        } catch (error) {
          console.log('Error', error);
          setSubmitting(false);
          setErrors(error);
          console.log('Error', error);
          enqueueSnackbar('Ocorreu um problema.', {
            variant: 'error'
          });
        }
      } else {
        const payload = {
          nome_contato: values.name,
          telefone_celular: values.phoneNumber,
          email_contato: values.email,
          chegou_via: values.arrived,
          telefone_fixo: values.phoneNumber,
          situacao: values.status,
          cadastro_valido: values.validRegister,
          id: dataAutocomplete.id
        };

        try {
          const response = await dispatch(UpdateCompany(payload));
          const { requestStatus } = response.meta;

          if (requestStatus === 'fulfilled') {
            enqueueSnackbar('Cadastro atualizado com sucesso!', {
              variant: 'success'
            });
          } else {
            enqueueSnackbar('Ocorreu um problema.', {
              variant: 'error'
            });
          }
          navigate(PATH_ADMIN.general.management.companies);
        } catch (error) {
          console.log('Error', error);
          setSubmitting(false);
          setErrors(error);
          enqueueSnackbar('Ocorreu um problema.', {
            variant: 'error'
          });
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const dropTributacao = ['Simples Nacional', 'Lucro Presumido', 'Lucro Real'];
  const dropContribuente = ['Contribuinte', 'Contribuinte Isento', 'Não contribuinte'];
  const dropIe = ['Contribuinte', 'Contribuinte Isento'];
  const questRed = [
    'Anúncios Patrocinados',
    'Facebook',
    'Google',
    'Instagram',
    'Outdoor',
    'Outros'
  ];
  const dropStatus = [
    'Normal',
    'Bloqueado',
    'Bloqueado Inadimplente',
    'Bloqueado Documentação',
    'Desativado'
  ];

  const currentCnpj: string = formik.getFieldProps('cnpj').value;

  useEffect(() => {
    set(currentCnpj);
  }, [currentCnpj]);

  const [validRegister, setValidRegister] = useState(false);
  const [termModal, setTermModal] = useState(false);
  const [vmei, setvmei] = useState(false);
  const [inscEst, setInscEst] = useState('');

  useEffect(() => {
    formik.setFieldValue('ie', inscEst);
  }, [inscEst]);

  useEffect(() => {
    if (dataAutocomplete) {
      if (dataAutocomplete.estabelecimento) {
        // clear temp
        formik.setFieldValue('regimeTax', '');
        // end clear temp

        formik.setFieldValue('company', dataAutocomplete?.razao_social);
        formik.setFieldValue(
          'companyName',
          dataAutocomplete?.estabelecimento?.nome_fantasia || dataAutocomplete?.razao_social
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
      } else {
        formik.setFieldValue('regimeTax', dataAutocomplete?.regime_tributario);
        formik.setFieldValue('company', dataAutocomplete?.razao);
        formik.setFieldValue('companyName', dataAutocomplete?.fantasia || dataAutocomplete?.razao);
        formik.setFieldValue('cnpj', dataAutocomplete?.cnpj);
        formik.setFieldValue('emailNfe', dataAutocomplete?.email_cnpj);
        formik.setFieldValue('confirmEmail', dataAutocomplete?.email_contato?.toLowerCase());
        formik.setFieldValue('address', dataAutocomplete?.endereco);
        formik.setFieldValue('country', dataAutocomplete?.bairro);
        formik.setFieldValue('zipCode', dataAutocomplete?.cep);
        formik.setFieldValue('state', dataAutocomplete?.estado);
        formik.setFieldValue('city', dataAutocomplete?.cidade);
        formik.setFieldValue('number', dataAutocomplete?.numero);
        formik.setFieldValue('complemento', dataAutocomplete?.complemento);
        formik.setFieldValue('bairro', dataAutocomplete?.bairro);
        formik.setFieldValue('mei', dataAutocomplete?.mei);
        formik.setFieldValue('name', dataAutocomplete?.nome_contato);
        formik.setFieldValue('cellNumber', dataAutocomplete?.telefone_celular);
        formik.setFieldValue('email', dataAutocomplete?.email_contato);
        formik.setFieldValue('arrived', dataAutocomplete?.chegou_via);
        formik.setFieldValue('ie', dataAutocomplete?.ie);
        formik.setFieldValue('phoneNumber', dataAutocomplete?.telefone_fixo);
        formik.setFieldValue('dateIn', moment(dataAutocomplete?.fundado_em).format('DD/MM/YYYY'));
        formik.setFieldValue('regimeTax', dataAutocomplete?.regime_tributario);
        formik.setFieldValue('icms', dataAutocomplete?.icms);
        formik.setFieldValue('status', `${dataAutocomplete?.situacao}`);
        formik.setFieldValue('validRegister', `${dataAutocomplete?.cadastro_valido}`);
        setValidRegister(dataAutocomplete?.cadastro_valido);
      }
    }
  }, [dataAutocomplete]);

  if (loading) {
    return (
      <Page title={typePage === 'New' ? 'Gestão: Nova Empresa' : 'Gestão: Empresa'}>
        <Container>
          <HeaderBreadcrumbs
            heading="Empresas"
            links={[
              { name: 'Empresas', href: PATH_ADMIN.general.management.companies },
              {
                name:
                  typePage === 'New' ? 'Nova Empresa' : formik.getFieldProps('companyName').value
              }
            ]}
          />
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
        </Container>
      </Page>
    );
  }

  return (
    <Page title={typePage === 'New' ? 'Gestão: Nova Empresa' : 'Gestão: Empresa'}>
      <Container>
        <HeaderBreadcrumbs
          heading="Empresas"
          links={[
            { name: 'Empresas', href: PATH_ADMIN.general.management.companies },
            {
              name: typePage === 'New' ? 'Nova Empresa' : formik.getFieldProps('companyName').value
            }
          ]}
        />
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
                        maskChar=""
                        {...getFieldProps('cnpj')}
                      >
                        {(inputProps: any) => <TextField {...inputProps} fullWidth label="CNPJ" />}
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
                      {formik.values.icms === 'Contribuinte' ? (
                        <TextField
                          {...getFieldProps('ie')}
                          sx={{ width: 600 }}
                          label="Inscrição Estadual"
                          value={inscEst}
                          onChange={(event) => {
                            setInscEst(event.target.value);
                            formik.setFieldValue('ie', event.target.value);
                          }}
                          error={Boolean(touched.ie && errors.ie)}
                        />
                      ) : null}
                    </Stack>
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
                        maskChar=""
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
                        maskChar=""
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
                      {typePage === 'New' ? (
                        <>
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
                        </>
                      ) : null}
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
                    <Typography variant="h5">Situação</Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={dropStatus}
                        sx={{ width: 600 }}
                        {...getFieldProps('status')}
                        onChange={(event, value) => formik.setFieldValue('status', value)}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            label="Status"
                            error={Boolean(touched.status && errors.status)}
                          />
                        )}
                      />
                      <FormControlLabel
                        {...getFieldProps('validRegister')}
                        checked={validRegister}
                        onChange={() => {
                          formik.setFieldValue('validRegister', !validRegister);
                          setValidRegister(!validRegister);
                        }}
                        control={<Switch />}
                        label="Cadastro Válido"
                      />
                    </Stack>
                    <Stack
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 1, sm: 2, md: 2 }}
                    >
                      <Box sx={{ mt: 3, display: 'flex' }}>
                        <Button
                          variant="outlined"
                          type="button"
                          color="primary"
                          onClick={() => navigate(-1)}
                        >
                          Cancelar
                        </Button>
                      </Box>
                      <Box sx={{ mt: 3, display: 'flex' }}>
                        <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                          {typePage === 'New' ? 'Cadastrar' : 'Atualizar'}
                        </LoadingButton>
                      </Box>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
};
// sx={{ backgroundColor: 'gray', ml: 1 }}
export default View;
