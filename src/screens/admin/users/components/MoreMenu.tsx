import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import unlockFill from '@iconify/icons-eva/unlock-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import { PATH_ADMIN } from 'routes/paths';
import { LoadingButton } from '@material-ui/lab';
// routes

// ----------------------------------------------------------------------
type MoreMenuProps = {
  onDelete: VoidFunction;
  onToggleStatus: VoidFunction;
  loadingStatus: boolean;
  ativo: boolean;
  id: number;
};

export default function MoreMenu({
  onDelete,
  onToggleStatus,
  loadingStatus,
  ativo,
  id
}: MoreMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={onDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Deletar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={onToggleStatus} sx={{ color: 'text.secondary' }}>
          {loadingStatus ? (
            <LoadingButton
              loading
              size="medium"
              variant="text"
              style={{
                width: '100%',
                padding: '12px 0',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
              }}
            />
          ) : (
            <>
              <ListItemIcon>
                <Icon icon={ativo ? lockFill : unlockFill} width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary={ativo ? 'Desativar' : 'Ativar'}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </>
          )}
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to={`${PATH_ADMIN.general.administrative.users}/${id}`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
