import { Icon } from '@iconify/react';
import React from 'react';
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
  Tabs,
  Tab,
  TablePagination
} from '@material-ui/core';
// redux
// routes
import { PATH_ADMIN, PATH_CLIENT, PATH_COMPANY } from 'routes/paths';
// @types
// components
import Scrollbar from 'components/Scrollbar';
import SearchNotFound from 'components/SearchNotFound';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import {
  CompanyListHead,
  CompanyMoreMenu,
  CompanyListToolbar
} from 'components/_dashboard/companies';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import moment from 'moment';
import { MaskCNPJ } from 'utils/masks';
import { GroupsViewProps } from '../Model';
import MoreMenu from '../../components/MoreMenu';

const View: React.FC<GroupsViewProps> = ({
  applySortFilter,
  TABLE_HEAD,
  currentTab,
  emptyRows,
  filter,
  filteredList,
  handleChangeRowsPerPage,
  handleDelete,
  handleFilter,
  isLoading,
  isNofilterResult,
  list,
  page,
  rowsPerPage,
  setCurrentTab,
  setFilter,
  setPage,
  setRowsPerPage,
  themeStretch,
  selected,
  setSelected
}) => (
  <Page title="Grupos Permissão">
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="Grupos de Permissão"
        links={[{ name: 'Home', href: PATH_CLIENT.general.home }, { name: 'Grupos de Permissão' }]}
        action={
          <Button
            variant="contained"
            component={RouterLink}
            to={PATH_CLIENT.general.administrative.registerGroup}
            startIcon={<Icon icon={plusFill} />}
          >
            Novo Grupo
          </Button>
        }
      />

      {isLoading ? (
        <div style={{ marginTop: '300px' }}>
          <LoadingScreen />
        </div>
      ) : (
        <Card>
          <CompanyListToolbar
            numSelected={selected.length}
            filterCompany={filter}
            onFilterCompany={handleFilter}
          />

          <Tabs
            value={currentTab}
            onChange={(event, value) => setCurrentTab(value)}
            style={{
              margin: 10
            }}
          >
            <Tab value="all" label="Todos" />

            <Tab value="active" label="Ativo" />
            <Tab value="inactive" label="Inativo" />
          </Tabs>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <CompanyListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {filteredList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, descricao, updated_at } = row;

                      const isItemSelected = selected.indexOf(descricao) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            {id}
                          </TableCell>
                          <TableCell style={{ minWidth: 100 }}>{descricao}</TableCell>
                          <TableCell style={{ maxWidth: 100 }}>
                            {updated_at ? moment(updated_at).format('DD/MM/YYYY') : ''}
                          </TableCell>

                          <TableCell align="right">
                            <MoreMenu onDelete={() => handleDelete(id)} id={id} />
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
                {isNofilterResult && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filter} />
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
            count={filteredList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage}
          />
        </Card>
      )}
    </Container>
  </Page>
);

export default View;
