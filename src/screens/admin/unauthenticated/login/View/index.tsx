import { Box, Container, Stack, Typography } from '@material-ui/core';
import React from 'react';
import Logo from 'components/Logo';
import { LoginForm } from 'components/authentication/loginMail';
import { ContentStyle, RootStyle } from './styles';
import { LoginViewProps } from '../Model';

const View: React.FC<LoginViewProps> = ({ SubmitCallback }) => (
  <RootStyle title="Admin TRIB">
    <Container maxWidth="sm">
      <ContentStyle>
        <Stack direction="column" alignItems="center" sx={{ mb: 5 }}>
          <Logo sx={{ width: 300, height: 300, alignSelf: 'center' }} />
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>Painel Administrativo.</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Entre com suas credenciais.</Typography>
          </Box>
        </Stack>

        <LoginForm SubmitCallback={SubmitCallback} />
      </ContentStyle>
    </Container>
  </RootStyle>
);

export default View;
