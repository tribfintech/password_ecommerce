import { useState } from 'react';
import { Icon } from '@iconify/react';
import folderAddFill from '@iconify/icons-eva/folder-add-fill';
import playFill from '@iconify/icons-eva/play-circle-fill';

// material
import {
  Card,
  Radio,
  FormControlLabel,
  Container,
  Button,
  Box,
  FormLabel,
  RadioGroup,
  FormControl,
  TextField,
  Stack
} from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import { start } from 'controllers/analyzeIcms';
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { AnalyzeICMSOptions } from '../../components/_dashboard/analyzeICMS';

export default function AnalyzeICMS() {
  const { themeStretch } = useSettings();
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Page title="Recursos: Análise de ICMS Mato Grosso">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Recursos - Análise de ICMS Mato Grosso"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Análise de ICMS Mato Grosso' }
          ]}
        />

        <Card sx={{ height: '100vh' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              size="small"
              variant="contained"
              endIcon={<Icon icon={folderAddFill} />}
              style={{ margin: '20px', padding: '16px 40px' }}
            >
              <label htmlFor="selectCompany" style={{ cursor: 'pointer' }}>
                Empresa
                <input
                  id="selectCompany"
                  name="selectCompany"
                  type="file"
                  style={{ display: 'none' }}
                />
              </label>
            </Button>

            <Box sx={{ margin: 2, width: 150 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data Inicial"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{ margin: 2, width: 150 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data Final"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>

            <FormControl>
              <FormLabel id="movementRadioGroupLabel">Movimento</FormLabel>
              <RadioGroup
                row
                aria-labelledby="movementRadioGroupLabel"
                name="movementRadioGroup"
                defaultValue="entry"
              >
                <FormControlLabel value="entry" control={<Radio />} label="Entradas" />
                <FormControlLabel value="exit" control={<Radio />} label="Saídas" />
              </RadioGroup>
            </FormControl>

            <Button
              style={{ marginLeft: 15, padding: ' 16px 20px' }}
              variant="contained"
              onClick={() => {
                const date = value || new Date();
                start(date, date, { name: 'entry' }, 1);
              }}
              startIcon={<Icon icon={playFill} />}
            >
              Analizar
            </Button>
          </Box>

          <Stack direction="column" spacing={2} sx={{ margin: 3 }}>
            <AnalyzeICMSOptions />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
