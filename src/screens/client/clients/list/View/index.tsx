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
  TablePagination,
  Checkbox,
  Tabs,
  Tab
} from '@material-ui/core';
// redux
// routes
import { PATH_ADMIN, PATH_COMPANY, PATH_DASHBOARD } from 'routes/paths';
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
import { CompanyClientsResponseProps } from 'services/request/models/response';
import { CompaniesListViewProps, CompanyProps } from '../Model';
import MoreMenu from '../components/MoreMenu';

const View: React.FC<CompaniesListViewProps> = ({
  TABLE_HEAD,
  themeStretch,
  selected,
  setSelected,
  page,
  setPage,
  filterCompany,
  setFilterCompany,
  rowsPerPage,
  setRowsPerPage,
  applySortFilter,
  handleChangeRowsPerPage,
  handleFilterByCompany,
  handleDelete,
  emptyRows,
  listFiltered,
  isLoading,
  currentTab,
  isListNotFound,
  setCurrentTab
}) => (
  <Page title="Gestão: Clientes">
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="Clientes"
        links={[{ name: 'Home', href: PATH_COMPANY.general.home }, { name: 'Clientes' }]}
        action={
          <Button
            variant="contained"
            component={RouterLink}
            to={PATH_COMPANY.general.management.registerclient}
            startIcon={<Icon icon={plusFill} />}
          >
            Novo Cliente
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
            filterCompany={filterCompany}
            onFilterCompany={handleFilterByCompany}
          />

          <Tabs
            value={currentTab}
            onChange={(event, value) => setCurrentTab(value)}
            style={{
              margin: 10
            }}
          >
            <Tab value="default" label="Padrão" />

            <Tab value="active" label="Ativo" />
            <Tab value="inactive" label="Inativo" />
          </Tabs>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <CompanyListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {listFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: CompanyClientsResponseProps) => {
                      const { id, razao, cnpj, updated_at, ativo } = row;

                      const isItemSelected = selected.indexOf(razao) !== -1;

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
                          <TableCell style={{ minWidth: 100 }}>{razao}</TableCell>
                          <TableCell style={{ minWidth: 140 }}>{MaskCNPJ(cnpj)}</TableCell>
                          <TableCell style={{ minWidth: 100 }}>{ativo ? 'SIM' : 'NÃO'}</TableCell>
                          <TableCell style={{ maxWidth: 100 }}>
                            {moment(updated_at).format('DD/MM/YYYY')}
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
                {isListNotFound && (
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
            count={listFiltered.length}
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
