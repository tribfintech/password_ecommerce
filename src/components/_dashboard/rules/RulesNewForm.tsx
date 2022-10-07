import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText
} from '@material-ui/core';
// utils
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { CompanyManager } from '../../../@types/company'; // MUDAR

// ----------------------------------------------------------------------

type RuleNewFormProps = {
  isEdit: boolean;
  currentRule?: CompanyManager;
};

export default function RulesNewForm({ isEdit, currentRule }: RuleNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewRuleSchema = Yup.object().shape({
    rule: Yup.string().required('Regra é obrigatório'),
    information: Yup.string().required('Informação é obrigatório'),
    description: Yup.string().required('Descrição é obrigatório'),
    group: Yup.string().required('Grupo é obrigatório'),
    valueField: Yup.string().required('Valor é obrigatório'),
    searchType: Yup.string().required('Tipo de Pesquisa é obrigatório'),
    taxation: Yup.string().required('Tributação é obrigatório'),
    companies: Yup.string().required('Empresas é obrigatório'),
    action: Yup.string().required('Ação é obrigatório'),
    fieldICMS: Yup.string().required('Campo é obrigatório')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      rule: currentRule?.cod || '',
      information: currentRule?.cnpj || '',
      description: currentRule?.email || '',
      group: currentRule?.name || '',
      valueField: currentRule?.name || '',
      searchType: currentRule?.name || 'approximation' || 'exactly',
      taxation:
        currentRule?.name || 'realProfit' || 'simpleNational' || 'presumedProfit' || 'allOptions',
      companies: currentRule?.name || 'selection' || 'allCompanies',
      action: currentRule?.name || 'adds' || ' modification' || 'reduce',
      fieldICMS: currentRule?.name || 'internalICMSRate' || 'externalICMRate' || 'unitaryValue'
    },
    validationSchema: NewRuleSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Criado com sucesso' : 'Atualizado com sucesso', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.registers.rules);
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
                <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                  <TextField
                    sx={{ width: 200 }}
                    fullWidth
                    label="Regra"
                    {...getFieldProps('rule')}
                    error={Boolean(touched.rule && errors.rule)}
                    helperText={touched.rule && errors.rule}
                  />
                  <TextField
                    sx={{ width: 720 }}
                    fullWidth
                    label="Informação"
                    {...getFieldProps('information')}
                    error={Boolean(touched.information && errors.information)}
                    helperText={touched.information && errors.information}
                  />
                </Stack>

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Descrição"
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />

                <FormControl component="fieldset" style={{ textAlign: 'center' }}>
                  <FormLabel component="legend">Tipo de Pesquisa</FormLabel>
                  <RadioGroup
                    onChange={formik.handleChange}
                    row
                    aria-label="searchType"
                    name="searchType"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <FormControlLabel
                      style={{ marginRight: 50 }}
                      value="approximation"
                      control={<Radio />}
                      label="Aproximação"
                      checked={formik.values.searchType === 'approximation'}
                    />
                    <FormControlLabel
                      value="exactly"
                      control={<Radio />}
                      label="Exata"
                      checked={formik.values.searchType === 'exactly'}
                    />
                    <FormHelperText
                      error={Boolean(formik.errors.searchType) && formik.touched.searchType}
                    >
                      {formik.errors.searchType}
                    </FormHelperText>
                  </RadioGroup>
                </FormControl>

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Grupo"
                  {...getFieldProps('group')}
                  error={Boolean(touched.group && errors.group)}
                  helperText={touched.group && errors.group}
                />

                <Stack flexDirection="row" justifyContent="center">
                  <FormControl
                    component="fieldset"
                    style={{ textAlign: 'center', marginRight: '100px' }}
                  >
                    <FormLabel component="legend">Tributação</FormLabel>
                    <RadioGroup
                      onChange={formik.handleChange}
                      row
                      aria-label="taxation"
                      name="taxation"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}
                    >
                      <FormControlLabel
                        value="realProfit"
                        control={<Radio />}
                        label="Lucro Real"
                        checked={formik.values.taxation === 'realProfit'}
                      />
                      <FormControlLabel
                        value="simpleNational"
                        control={<Radio />}
                        label="Simples Nacional"
                        checked={formik.values.taxation === 'simpleNational'}
                      />
                      <FormControlLabel
                        value="presumedProfit"
                        control={<Radio />}
                        label="Lucro Presumido"
                        checked={formik.values.taxation === 'presumedProfit'}
                      />
                      <FormControlLabel
                        value="allOptions"
                        control={<Radio />}
                        label="Todas"
                        checked={formik.values.taxation === 'allOptions'}
                      />

                      <FormHelperText
                        error={Boolean(formik.errors.taxation) && formik.touched.taxation}
                      >
                        {formik.errors.taxation}
                      </FormHelperText>
                    </RadioGroup>
                  </FormControl>

                  <FormControl
                    component="fieldset"
                    style={{ textAlign: 'center', marginRight: '100px' }}
                  >
                    <FormLabel component="legend">Empresas</FormLabel>
                    <RadioGroup
                      onChange={formik.handleChange}
                      row
                      aria-label="companies"
                      name="companies"
                      style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
                    >
                      <FormControlLabel
                        value="selection"
                        control={<Radio />}
                        label="Seleção"
                        checked={formik.values.companies === 'selection'}
                      />
                      <FormControlLabel
                        value="allCompanies"
                        control={<Radio />}
                        label="Todas"
                        checked={formik.values.companies === 'allCompanies'}
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl
                    component="fieldset"
                    style={{ textAlign: 'center', marginRight: '100px' }}
                  >
                    <FormLabel component="legend">Ação</FormLabel>
                    <RadioGroup
                      onChange={formik.handleChange}
                      row
                      aria-label="action"
                      name="action"
                      style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
                    >
                      <FormControlLabel
                        value="adds"
                        control={<Radio />}
                        label="Acrescenta"
                        checked={formik.values.action === 'adds'}
                      />
                      <FormControlLabel
                        value="modification"
                        control={<Radio />}
                        label="Modifica"
                        checked={formik.values.action === 'modification'}
                      />
                      <FormControlLabel
                        value="reduce"
                        control={<Radio />}
                        label="Reduz"
                        checked={formik.values.action === 'reduce'}
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl component="fieldset" style={{ textAlign: 'center' }}>
                    <FormLabel component="legend">Campo</FormLabel>
                    <RadioGroup
                      onChange={formik.handleChange}
                      row
                      aria-label="fieldValue"
                      name="fieldValue"
                      style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
                    >
                      <FormControlLabel
                        value="internalICMSRate"
                        control={<Radio />}
                        label="Alíquota Interna ICMS"
                        checked={formik.values.fieldICMS === 'internalICMSRate'}
                      />
                      <FormControlLabel
                        value="externalICMRate"
                        control={<Radio />}
                        label="Alíquota Externa ICMS"
                        checked={formik.values.fieldICMS === 'externalICMRate'}
                      />
                      <FormControlLabel
                        value=" unitaryValue"
                        control={<Radio />}
                        label=" Valor Unitário"
                        checked={formik.values.fieldICMS === 'unitaryValue'}
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>

                <TextField
                  fullWidth
                  label="Valor"
                  {...getFieldProps('valueField')}
                  error={Boolean(touched.valueField && errors.valueField)}
                  helperText={touched.valueField && errors.valueField}
                />

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Criar' : 'Salvar Mudanças'}
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
