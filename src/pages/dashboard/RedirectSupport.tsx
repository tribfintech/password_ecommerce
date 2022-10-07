import { ReactNode } from 'react';
// material
import { Container, Typography, Link } from '@material-ui/core';
// routes
import { PATH_DASHBOARD, PATH_SUPPORT } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

type RedirectSupportProps = {
  url: ReactNode;
};

// ----------------------------------------------------------------------

export default function RedirectSupport({ url }: RedirectSupportProps) {
  const { themeStretch } = useSettings();

  window.open(`${url}`, '_blank');

  return (
    <Page title="Whatsapp (Suporte)">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Whatsapp (Suporte)"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Whatsapp (Suporte)' }]}
        />

        <Typography variant="body1" gutterBottom component="div">
          Não abriu?
          <Link sx={{ marginLeft: '5px' }} target="_blank" href={PATH_SUPPORT}>
            Clique aqui!
          </Link>
        </Typography>
      </Container>
    </Page>
  );
}
