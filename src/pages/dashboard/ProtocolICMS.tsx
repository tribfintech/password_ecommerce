import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Checkbox
} from '@material-ui/core';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getUserList, deleteUser } from '../../redux/slices/user'; // Mudar
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// @types
import { UserManager } from '../../@types/user'; // Mudar
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  ProtocolListHead,
  ProtocolMoreMenu,
  ProtocolListToolbar
} from '../../components/_dashboard/protocol';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'item', label: 'Item', alignRight: false },
  { id: 'ncm', label: 'NCM', alignRight: false },
  { id: 'description', label: 'Descrição', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------
function applySortFilter(array: UserManager[], query: string) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ProtocolICMS() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const { userList } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(0);
  const [filterProtocol, setFilterProtocol] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const selected = userList.map((n) => n.name);
      setSelected(selected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByProtocol = (filterProtocol: string) => {
    setFilterProtocol(filterProtocol);
  };

  const handleDeleteProtocol = (protocolId: string) => {
    dispatch(deleteUser(protocolId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredProtocols = applySortFilter(userList, filterProtocol);

  const isProtocolNotFound = filteredProtocols.length === 0;

  return (
    <Page title="Redução de Base de Cálculo: Protocolo 41/2008">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Redução de Base de Cálculo - Protocolo 41/2008"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Protocolo 41/2008' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.taxBase.newProtocolICMS}
              startIcon={<Icon icon={plusFill} />}
            >
              Novo Protocolo
            </Button>
          }
        />

        <Card>
          <ProtocolListToolbar
            numSelected={selected.length}
            filterProtocol={filterProtocol}
            onFilterProtocol={handleFilterByProtocol}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <ProtocolListHead
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProtocols
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name } = row;

                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={() => handleClick(name)}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            {name}
                          </TableCell>
                          <TableCell style={{ minWidth: 100 }}>3815.12.10</TableCell>
                          <TableCell style={{ minWidth: 400 }}>
                            Catalizadores em colméia cerâmica ou metálica para conversão catalítica
                            de gases de escape de veículos
                          </TableCell>

                          <TableCell align="right">
                            <ProtocolMoreMenu
                              onDelete={() => handleDeleteProtocol(id)}
                              protocolName={name}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isProtocolNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterProtocol} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
