import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import trashFill from '@iconify/icons-eva/trash-fill';
import { useEffect, useState } from 'react';
import { fCurrency } from 'utils/formatNumber';
import { ImporterLoadingFiles, ImporterActions } from '.';
import { ImportedFile, ImportModalProps } from '../../../@types/importer';

const ImporterModalSelectFiles = ({
  open,
  reading,
  analyzing,
  currentFile,
  filesLength,
  files: selectedFiled,
  onClose,
  onSelectFiles
}: ImportModalProps) => {
  const [files, setFiles] = useState<ImportedFile[]>([]);

  const loading = analyzing || reading;
  const notFound = !loading && files.length === 0;

  useEffect(() => {
    setFiles(selectedFiled);
  }, [selectedFiled]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setFiles([]);
      }, 200);
    }
  }, [open]);

  const removeItem = (item: ImportedFile) => () => {
    setFiles(files.filter((file) => file.id !== item.id));
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Arquivos para importação</DialogTitle>
      <DialogContent>
        <ImporterLoadingFiles
          show={loading}
          text={`${currentFile} de ${filesLength} arquivos ${reading ? 'lidos' : 'analisados'}`}
        />

        {notFound && <Alert color="warning">Nenhum arquivo encontrado</Alert>}

        <List>
          {!loading &&
            files.map((file, i) => (
              <Fade key={`file-to-import-${file.id}`} in timeout={i * 100 > 5000 ? i * 100 : 5000}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={file.file.name}
                    secondary={
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="caption">
                          <b>Prestador:</b>{' '}
                          {file.xmlObj?.CompNfse?.Nfse?.InfNfse?.PrestadorServico?.NomeFantasia}
                        </Typography>
                        <Typography variant="caption">
                          <b>Data Emissão:</b>{' '}
                          {file.xmlObj?.CompNfse?.Nfse?.InfNfse?.DataEmissao &&
                            format(
                              new Date(file.xmlObj?.CompNfse?.Nfse?.InfNfse?.DataEmissao),
                              'dd/MM/yyyy'
                            )}
                        </Typography>
                        <Typography variant="caption">
                          <b>Valor liquido:</b>{' '}
                          {file.xmlObj?.CompNfse?.Nfse?.InfNfse?.ValoresNfse?.ValorLiquidoNfse &&
                            fCurrency(
                              file.xmlObj?.CompNfse?.Nfse?.InfNfse?.ValoresNfse?.ValorLiquidoNfse
                            )}
                        </Typography>
                      </div>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Button startIcon={<Icon icon={trashFill} />} onClick={removeItem(file)}>
                      Remover
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </Fade>
            ))}
        </List>

        {notFound && <ImporterActions onSelectFiles={onSelectFiles} insideModal />}
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading || notFound}
          variant="contained"
          onClick={() => {
            onClose(files);
          }}
        >
          Iniciar importação
        </Button>
        <Button disabled={loading} color="error" onClick={() => onClose()}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImporterModalSelectFiles;
