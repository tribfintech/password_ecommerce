import { Paper, PaperProps, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

interface SearchNotFoundProps extends PaperProps {
  searchQuery?: string;
  showHelp?: boolean;
  notFoundText?: string;
}

export default function SearchNotFound({
  searchQuery = '',
  showHelp = true,
  notFoundText = 'Não encontrado',
  ...other
}: SearchNotFoundProps) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        {notFoundText}
      </Typography>
      {showHelp && (
        <Typography variant="body2" align="center">
          Sem resultados para &nbsp;
          <strong>&quot;{searchQuery}&quot;</strong>. Tente verificar se há erros de digitação ou
          usar palavras completas.
        </Typography>
      )}
    </Paper>
  );
}
