import { Container, Grid } from '@material-ui/core';
import { AppWelcome } from 'components/_dashboard/general-app';
import ClientLayout from 'layouts/ClientLayout';
import React from 'react';
import { HomeViewProps } from '../Model';
import { RootStyle } from './styles';

const View: React.FC<HomeViewProps> = ({ user }) => (
  <RootStyle title="TRIB">
    <ClientLayout />
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <AppWelcome displayName={user?.nome} />
        </Grid>
      </Grid>
    </Container>
  </RootStyle>
);

export default View;
