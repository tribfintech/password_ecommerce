import { filter } from 'lodash';
import { useState, useEffect } from 'react';
// material
import {
  Card,
  Table,
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
  AttachmentListHead,
  AttachmentListToolbar,
  AttachmentSelect,
  AttachmentMoreMenu,
  AttachmentParameter
} from '../../components/_dashboard/attachment';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'item', label: 'Item', alignRight: false },
  { id: 'ncm', label: 'NCM', alignRight: false },
  { id: 'description', label: 'Descrição', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'beginningOfValidity', label: 'Início Vigência', alignRight: false },
  { id: '' }
];

const DATA = [
  {
    id: 1,
    info: `Da Redução de Base de Cálculo em Operações com Mercadorias Integrantes da Cesta Básica
    (Art. 1º)`
  },
  {
    id: 2,
    info: `Da Redução de Base de Cálculo em Operações com Produtos com Origem nos Reinos Animal e
    Vegetal, Predominantemente Destinados a Uso na Alimentação Humana (Art. 2º a 7º)`
  },
  {
    id: 3,
    info: `Da Redução de Base de Cálculo em Operações Realizadas por Estabelecimento Comercial
    Atacadista de Produtos Predominantemente Alimentícios (Art. 8º e 9º)`
  },
  {
    id: 5,
    info: `Da Redução de Base de Cálculo em Operações com Fármacos, Remédios, Medicamentos ou Outros Produtos Farmacêuticos, bem como com Cosméticos, Perfumes e Produtos de Higiene Pessoal (Art. 12`
  }
];

// ----------------------------------------------------------------------
function applySortFilter(array: UserManager[], query: string) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AttachmentV() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const { userList } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(0);
  const [filterAttachment, setFilterAttachment] = useState('');
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

  const handleFilterByAttachment = (filterAttachment: string) => {
    setFilterAttachment(filterAttachment);
  };

  const handleDeleteAttachment = (attachmentId: string) => {
    dispatch(deleteUser(attachmentId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredAttachments = applySortFilter(userList, filterAttachment);

  const isAttachmentNotFound = filteredAttachments.length === 0;

  return (
    <Page title="Redução de Base de Cálculo: Anexo V">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Redução de Base de Cálculo - Anexo V"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Anexo V' }]}
        />

        <AttachmentSelect headLabel={DATA} />

        <AttachmentParameter />

        <Card>
          <AttachmentListToolbar
            numSelected={selected.length}
            filterAttachment={filterAttachment}
            onFilterAttachment={handleFilterByAttachment}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <AttachmentListHead
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredAttachments
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
                            01
                          </TableCell>
                          <TableCell style={{ minWidth: 30 }}>ncm</TableCell>
                          <TableCell style={{ minWidth: 370 }}>{name}</TableCell>
                          <TableCell style={{ minWidth: 50 }}>status</TableCell>
                          <TableCell style={{ minWidth: 50 }}>01/01/2022</TableCell>

                          <TableCell align="right">
                            <AttachmentMoreMenu
                              onDelete={() => handleDeleteAttachment(id)}
                              attachmentsName={name}
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
                {isAttachmentNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterAttachment} />
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
