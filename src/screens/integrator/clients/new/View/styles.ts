import { styled } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import Page from 'components/Page';

export const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

export const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

export const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: '70vw',
  minHeight: '100vh',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

export const ContentStyleLoading = styled('div')(({ theme }) => ({
  maxWidth: '70vw',
  height: 800,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));
