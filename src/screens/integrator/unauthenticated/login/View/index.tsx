import { Box, Container, Link, Stack, Typography } from '@material-ui/core';
import React from 'react';
import Logo from 'components/Logo';
import { LoginForm } from 'components/authentication/login';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import { ContentStyle, RootStyle } from './styles';
import { LoginViewProps } from '../Model';

const View: React.FC<LoginViewProps> = ({ SubmitCallback }) => (
  <RootStyle title="Login TRIB">
    <Container maxWidth="sm">
      <ContentStyle>
        <Stack direction="column" alignItems="center" sx={{ mb: 5 }}>
          <Logo sx={{ width: 300, height: 300, alignSelf: 'center' }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
              Painel do Integrador.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Entre com suas credenciais.</Typography>
          </Box>
        </Stack>

        <LoginForm SubmitCallback={SubmitCallback} />

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Não possui cadastro?&nbsp;
          <Link variant="subtitle2" component={RouterLink} to={PATH_APP.user.register}>
            Cadastre-se aqui!
          </Link>
        </Typography>
      </ContentStyle>
    </Container>
  </RootStyle>
);

export default View;
