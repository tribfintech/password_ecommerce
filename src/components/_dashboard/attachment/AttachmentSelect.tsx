import { useState } from 'react';
// material
import { MenuItem, InputLabel, Select, FormControl, Box, TextField } from '@material-ui/core';

type AttachmentSelectProps = {
  headLabel: any[];
};

export default function AttachmentSelect({ headLabel }: AttachmentSelectProps) {
  const [parameter, setParameter] = useState('');

  const handleChange = (event: any) => {
    setParameter(event.target.value);
  };

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="chapterInput">Capítulo</InputLabel>
          <Select
            labelId="chapter"
            id="chapterSelect"
            value={parameter}
            label="Multiline"
            onChange={handleChange}
          >
            {headLabel.map((headCell) => (
              <MenuItem key={headCell.id} value={headCell.id}>
                {headCell.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 837 }}>
          <InputLabel id="chapterInput">Nome</InputLabel>
          <Select
            labelId="name"
            id="chapterSelect"
            value={parameter}
            label="Parameter"
            onChange={handleChange}
          >
            {headLabel.map((headCell) => (
              <MenuItem
                key={headCell.id}
                value={headCell.id}
                style={{
                  whiteSpace: 'normal',
                  minHeight: '50px',
                  height: 'auto',
                  maxWidth: '785px'
                }}
              >
                {headCell.info}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <FormControl sx={{ m: 1, minWidth: 973 }}>
        <TextField id="text" multiline rows={4} defaultValue="Sem dados no momento" />
      </FormControl>
    </>
  );
}
