import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
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
import { getUserList, deleteUser } from '../../redux/slices/user'; // Change name
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// @types
import { UserManager } from '../../@types/user'; // Change name
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  CompanyListHead,
  CompanyMoreMenu,
  CompanyListToolbar
} from '../../components/_dashboard/companies';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'cod', label: 'Código', alignRight: false },
  { id: 'corporateName', label: 'Razão Social', alignRight: false },
  { id: 'cnpj', label: 'CNPJ', alignRight: false },
  { id: 'taxation', label: 'Tributação', alignRight: false },
  { id: 'icmsST', label: 'Calcula ICMS ST dentro do estado', alignRight: false },
  {
    id: 'icms7',
    label: 'Limitar alíquota ICMS até 7% (Parágrafo 2º, Artigo 1º)',
    alignRight: false
  },
  { id: 'ordinance195granted', label: 'Portaria 195 Outorgado', alignRight: false },
  { id: '' }
];

const TABLE_SUBHEAD = [
  { id: '' },
  { id: 'general', label: 'Gerais', alignRight: false },
  { id: '' },
  { id: '' },
  { id: '' },
  { id: 'tables', label: 'Tabelas', alignRight: false },
  { id: 'ordinance195', label: 'Portaria 195', alignRight: true },
  { id: '' },
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

export default function CompaniesList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const { userList } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(0);
  const [filterCompany, setFilterCompany] = useState('');
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

  const handleFilterByCompany = (filterCompany: string) => {
    setFilterCompany(filterCompany);
  };

  const handleDeleteCompany = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredCompanies = applySortFilter(userList, filterCompany);

  const isCompanyNotFound = filteredCompanies.length === 0;

  return (
    <Page title="Cadastros: Cadastro de Empresas">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Cadastros - Cadastro de Empresas"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Cadastro de Empresas' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.registers.newCompany}
              startIcon={<Icon icon={plusFill} />}
            >
              Nova Empresa
            </Button>
          }
        />

        <Card>
          <CompanyListToolbar
            numSelected={selected.length}
            filterCompany={filterCompany}
            onFilterCompany={handleFilterByCompany}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <CompanyListHead
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCompanies
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
                            101
                          </TableCell>
                          <TableCell style={{ minWidth: 100 }}>{name}</TableCell>
                          <TableCell style={{ minWidth: 140 }}>XX. XXX. XXX/0001-XX</TableCell>
                          <TableCell style={{ minWidth: 200 }}>Lucro Presumido</TableCell>
                          <TableCell style={{ maxWidth: 40, textAlign: 'center' }}>Sim</TableCell>
                          <TableCell style={{ maxWidth: 40, textAlign: 'center' }}>Não</TableCell>
                          <TableCell style={{ maxWidth: 40, textAlign: 'center' }}>Sim</TableCell>

                          <TableCell align="right">
                            <CompanyMoreMenu onDelete={() => handleDeleteCompany(id)} id={0} />
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
                {isCompanyNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterCompany} />
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
