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
  Checkbox,
  Typography
} from '@material-ui/core';
// redux
import { RulesInformation } from 'components/_dashboard/rules/RulesInformation';
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
import { RulesHead, RulesToolbar, RulesMoreMenu } from '../../components/_dashboard/rules';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'rule', label: 'Regra', alignRight: false },
  { id: 'information', label: 'Informação', alignRight: false },
  { id: 'description', label: 'Descrição', alignRight: false },
  { id: 'typeResearch', label: 'Tipo de Pesquisa', alignRight: false },
  { id: 'group', label: 'Grupo', alignRight: false },
  { id: 'tax', label: 'Tributação', alignRight: false },
  { id: 'companies', label: 'Empresas', alignRight: false },
  { id: 'action', label: 'Ação', alignRight: false },
  { id: 'field', label: 'Campo', alignRight: false },
  { id: 'value', label: 'Valor', alignRight: false },
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

export default function Rules() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const { userList } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(0);
  const [filterNameRule, setFilterNameRule] = useState('Regulamento do ICMS/2014');
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

  const handleFilterByNameRule = (filterNameRule: string) => {
    setFilterNameRule(filterNameRule);
  };

  const handleDeleteRule = (ruleId: string) => {
    dispatch(deleteUser(ruleId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredRules = applySortFilter(userList, filterNameRule);

  const isRuleNotFound = filteredRules.length === 0;

  return (
    <Page title="Cadastros: Regras Customizadas">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Cadastros - Regras Customizadas"
          links={[
            { name: 'Grupo de Regras', href: PATH_DASHBOARD.registers.rulesGroup },
            { name: 'Regras' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.registers.newRules}
              startIcon={<Icon icon={plusFill} />}
            >
              Novo Item
            </Button>
          }
        />

        <Card>
          <Typography variant="h5" sx={{ marginTop: 2.8, marginLeft: 2.8 }}>
            Seleção de grupo de regras
          </Typography>

          <RulesToolbar filterRule={filterNameRule} onFilterRule={handleFilterByNameRule} />

          <RulesInformation />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <RulesHead
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredRules
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
                            272
                          </TableCell>
                          <TableCell style={{ minWidth: 120 }}>2205</TableCell>
                          <TableCell style={{ minWidth: 70 }}>{name}</TableCell>
                          <TableCell style={{ minWidth: 50 }}>Aproximação</TableCell>
                          <TableCell style={{ minWidth: 50 }}>Regulamento de ICMS/2014</TableCell>
                          <TableCell style={{ minWidth: 50 }}>Lucro Real</TableCell>
                          <TableCell style={{ minWidth: 50 }}>Todas</TableCell>
                          <TableCell style={{ minWidth: 120 }}>Reduz</TableCell>
                          <TableCell style={{ minWidth: 70 }}>Alíquota Externa ICMS</TableCell>
                          <TableCell style={{ minWidth: 70 }}>25,00</TableCell>

                          <TableCell align="right">
                            <RulesMoreMenu onDelete={() => handleDeleteRule(id)} ruleName={name} />
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
                {isRuleNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterNameRule} />
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
