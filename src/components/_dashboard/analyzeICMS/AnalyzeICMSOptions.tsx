import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Button,
  Box,
  TextField,
  Typography
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';

import minusCircleOutline from '@iconify/icons-eva/minus-circle-outline';
import { useState } from 'react';

export default function AnalyzeICMSOptions() {
  const [parameter, setParameter] = useState(true);

  function handleClickParameter() {
    setParameter((initialParameter) => !initialParameter);
  }

  return (
    <Stack
      spacing={1}
      direction="row"
      sx={{ minWidth: 900, display: 'flex', flexDirection: 'column' }}
    >
      {!parameter ? (
        <>
          <Box sx={{ margin: 3 }}>
            <Button
              sx={{ minWidth: '100%' }}
              variant="contained"
              onClick={() => handleClickParameter()}
              startIcon={<Icon icon={minusCircleOutline} />}
            >
              Esconder Opções
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ marginLeft: 2 }}>
              <Typography style={{ marginLeft: 16 }} variant="h6" gutterBottom>
                Informações da empresa selecionada
              </Typography>
              <TextField
                sx={{ marginBottom: 3, minWidth: 470 }}
                id="text"
                multiline
                rows={2}
                defaultValue="Nenhuma selecionada"
              />
            </Box>

            <Box>
              <Typography style={{ marginLeft: 16 }} variant="h6" gutterBottom>
                Opções Avançadas
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Filtra Apenas NCMs Encontrados"
                />
                <FormControlLabel
                  control={<Checkbox disabled />}
                  label="Apura ST dentro do Estado"
                />
              </FormGroup>
            </Box>

            <Box>
              <Typography style={{ marginLeft: 16 }} variant="h6" gutterBottom>
                Nota selecionada
              </Typography>
              <TextField
                sx={{ marginBottom: 3, minWidth: 200, marginRight: 3 }}
                id="text"
                multiline
                rows={2}
                defaultValue="Nenhuma"
              />
            </Box>
          </Box>
          <Typography style={{ marginLeft: 26 }} variant="inherit" gutterBottom>
            File not found.
          </Typography>
        </>
      ) : (
        <Box sx={{ margin: 3 }}>
          <Button
            sx={{ minWidth: '100%' }}
            variant="contained"
            onClick={() => handleClickParameter()}
            startIcon={<Icon icon={plusFill} />}
          >
            Mostrar Opções
          </Button>
        </Box>
      )}
    </Stack>
  );
}
