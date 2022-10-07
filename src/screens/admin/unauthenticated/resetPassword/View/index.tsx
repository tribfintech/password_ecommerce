// hooks
import { FC } from 'react';
// react-router
import { Link as RouterLink } from 'react-router-dom';
// material
import Logo from 'components/Logo';
import { Box, Button, Container, Typography, Stack } from '@material-ui/core';
import { PATH_ADMIN } from 'routes/paths';
import { RootStyle } from './styles';
// components
import ResetPasswordForm from '../Components/ResetPasswordForm';
import { AdminRecoveryViewProps } from '../Model';

// ----------------------------------------------------------------------
const View: FC<AdminRecoveryViewProps> = ({ fetchRecovery }) => (
  <RootStyle title="Recuperar Senha">
    <Container>
      <Stack direction="column" alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
        <Logo sx={{ width: 300, height: 300, alignSelf: 'center' }} />
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <Typography variant="h3" paragraph>
            Esqueceu sua Senha?
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            Informe seu E-mail para enviarmos uma nova senha.
          </Typography>

          <ResetPasswordForm fetchRecovery={fetchRecovery} />

          <Button
            fullWidth
            size="large"
            component={RouterLink}
            to={PATH_ADMIN.general.home}
            sx={{ mt: 1 }}
          >
            Voltar
          </Button>
        </Box>
      </Stack>
    </Container>
  </RootStyle>
);

export default View;
