import { styled, Card } from '@mui/material';
import { Container } from '@material-ui/core'

export const RootStyle = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "auto",
  boxSizing: "border-box",
  marginTop: 150,
  marginBottom: 100
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
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

export const StepIconComponent = styled('div')(() => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: 'currentColor'
}));
