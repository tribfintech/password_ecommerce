import { Stack, Button, Box, TextField, Typography } from '@material-ui/core';
import { Icon } from '@iconify/react';
import plusCircleOutline from '@iconify/icons-eva/plus-circle-outline';
import minusCircleOutline from '@iconify/icons-eva/minus-circle-outline';
import { useState } from 'react';

export default function AttachmentParameter() {
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
            <Button variant="contained" onClick={() => handleClickParameter()}>
              <Icon icon={minusCircleOutline} style={{ width: 23, height: 23, marginRight: 5 }} />
              Esconder parâmetros
            </Button>
          </Box>
          <Box>
            <Typography style={{ marginLeft: 16 }} variant="h6" gutterBottom>
              Configuração de cálculo
            </Typography>
            <TextField
              sx={{ marginBottom: 3, minWidth: 973 }}
              id="text"
              multiline
              rows={10}
              defaultValue="Sem dados no momento"
            />
          </Box>
        </>
      ) : (
        <Box sx={{ margin: 3 }}>
          <Button variant="contained" onClick={() => handleClickParameter()}>
            <Icon icon={plusCircleOutline} style={{ width: 23, height: 23, marginRight: 5 }} />
            Mostrar parâmetros
          </Button>
        </Box>
      )}
    </Stack>
  );
}
