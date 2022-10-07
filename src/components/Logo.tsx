// material
import { Box, BoxProps } from '@material-ui/core';
import { ReactComponent as TribLogo } from './tribsvg.svg';

// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <TribLogo
        style={{
          height: '100%',
          width: '100%'
        }}
      />
    </Box>
  );
}
