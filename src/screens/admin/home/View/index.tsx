import { Container, Grid } from '@material-ui/core';
import {
  AppTotalActiveUsers,
  AppTotalInstalled,
  AppWelcome
} from 'components/_dashboard/general-app';
import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import { HomeViewProps } from '../Model';
import { RootStyle } from './styles';

const View: React.FC<HomeViewProps> = ({ user }) => (
  <RootStyle title="Admin TRIB">
    <AdminLayout />
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <AppWelcome displayName={user?.nome} />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1}>
        <Grid item xs={6} md={4}>
          <AppTotalActiveUsers />
        </Grid>

        <Grid item xs={6} md={4}>
          <AppTotalInstalled />
        </Grid>
      </Grid>
    </Container>
  </RootStyle>
);

export default View;
