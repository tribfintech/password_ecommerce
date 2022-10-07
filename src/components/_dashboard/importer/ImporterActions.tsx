import { Icon } from '@iconify/react';
import folderAddFill from '@iconify/icons-eva/folder-add-fill';
import fileAddFill from '@iconify/icons-eva/file-add-fill';
// material
import { styled } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';
import { ImporterActionsProps } from '../../../@types/importer';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(5)
}));

// ----------------------------------------------------------------------

export default function ImporterActions({
  onSelectFiles,
  insideModal = false
}: ImporterActionsProps) {
  return (
    <RootStyle>
      <Box style={{ flexBasis: '100%' }}>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: insideModal ? 'center' : 'end'
          }}
        >
          <Button color="primary" variant="contained" endIcon={<Icon icon={folderAddFill} />}>
            <label htmlFor="selectFile" style={{ cursor: 'pointer' }}>
              Importar uma pasta
              <input
                id="selectFile"
                multiple={true}
                name="selectFile"
                type="file"
                accept="*.xml,application/xml"
                style={{ display: 'none' }}
                onChange={onSelectFiles}
                ref={(ref) => {
                  if (ref) {
                    ref.setAttribute('webkitdirectory', 'webkitdirectory');
                  }
                }}
              />
            </label>
          </Button>

          <Button
            color="info"
            variant="contained"
            endIcon={<Icon icon={fileAddFill} />}
            sx={{ mx: 1 }}
          >
            <label htmlFor="downloadFile" style={{ cursor: 'pointer' }}>
              Importar arquivos
              <input
                id="downloadFile"
                name="downloadFile"
                type="file"
                accept="*.xml,application/xml"
                style={{ display: 'none' }}
                onChange={onSelectFiles}
                multiple
              />
            </label>
          </Button>
        </Box>
      </Box>
    </RootStyle>
  );
}
