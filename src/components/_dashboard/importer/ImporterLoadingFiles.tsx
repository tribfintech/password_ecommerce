import { Box, Typography, LinearProgress, Fade } from '@material-ui/core';

type ImporterLoadingFilesProps = {
  text: string;
  show: boolean;
};

const ImporterLoadingFiles = ({ text, show }: ImporterLoadingFilesProps) => (
  <Fade in={show} unmountOnExit>
    <Box mb={5}>
      <Typography variant="caption" color="textSecondary">
        {text}
      </Typography>
      <LinearProgress variant="indeterminate" />
    </Box>
  </Fade>
);

export default ImporterLoadingFiles;
