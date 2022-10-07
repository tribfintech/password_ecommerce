import { useEffect } from 'react';
// material
import { Container, TextField, Stack, Box, Typography, Card } from '@material-ui/core';
// redux
import { useDispatch } from '../../redux/store';
import { getCompanyList } from '../../redux/slices/company';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function License() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanyList());
  }, [dispatch]);

  return (
    <Page title="Licenciamento">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Licenciamento"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Licenciamento' }]}
        />

        <Card sx={{ padding: 5 }}>
          <Box sx={{ width: 900 }}>
            <TextField
              id="outlined-read-only-input"
              label="Sua Licença"
              defaultValue="2-ANALIZADORICMS-9403EE82BF3B6F3C02DF70376832E4E2"
              InputProps={{
                readOnly: true
              }}
              sx={{ width: 900, marginBottom: 3 }}
            />

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 3, sm: 2 }}
              style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', marginBottom: 30 }}
            >
              <TextField
                id="outlined-read-only-input"
                label="Razão Social"
                defaultValue="PRODUTIVO MAIS TECNOLOGIA EM SOTFWARE LTDA"
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Status do Cliente"
                defaultValue="Ativo"
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 3, sm: 2 }}
              style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', marginBottom: 50 }}
            >
              <TextField
                id="outlined-read-only-input"
                label="Número Contrato"
                defaultValue="AI000032021"
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Status do Contrato"
                defaultValue="Ativo"
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 3, sm: 2 }}
              style={{ width: 500, marginBottom: 30 }}
            >
              <TextField
                id="outlined-read-only-input"
                label="Boletos Pendentes"
                defaultValue="0"
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Data de Encerramento"
                defaultValue="31-12-2022"
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Box>

          <Typography variant="h5" gutterBottom component="div">
            Observações
          </Typography>

          <Typography variant="subtitle1" gutterBottom component="div">
            Pendências que levam ao bloqueio do sistema:
          </Typography>

          <Box sx={{ marginLeft: 3 }}>
            <ul>
              <li>Status do Cliente: Suspenso ou Inativo;</li>
              <li>Status do Contrato: Suspenso ou Inativo;</li>
              <li>Quantidade de boletos em aberto igual a dois.</li>
            </ul>
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
