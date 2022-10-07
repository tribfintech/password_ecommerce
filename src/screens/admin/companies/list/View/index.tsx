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
import { PATH_ADMIN, PATH_DASHBOARD } from 'routes/paths';
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
import { CompaniesListViewProps, CompanyProps } from '../Model';

const View: React.FC<CompaniesListViewProps> = ({
  TABLE_HEAD,
  themeStretch,
  selected,
  setSelected,
  CompaniesList,
  page,
  setPage,
  filterCompany,
  setFilterCompany,
  rowsPerPage,
  setRowsPerPage,
  applySortFilter,
  handleChangeRowsPerPage,
  handleFilterByCompany,
  handleDeleteCompany,
  emptyRows,
  filteredCompanies,
  isCompanyNotFound,
  isLoading,
  currentTab,
  setCurrentTab
}) => (
  <Page title="Gestão: Empresas">
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="Empresas"
        links={[{ name: 'Home', href: PATH_ADMIN.general.home }, { name: 'Empresas' }]}
        action={
          <Button
            variant="contained"
            component={RouterLink}
            to={PATH_ADMIN.general.management.registerCompanies}
            startIcon={<Icon icon={plusFill} />}
          >
            Nova Empresa
          </Button>
        }
      />

      {isLoading ? (
        <div style={{ marginTop: '300px' }}>
          <LoadingScreen />
        </div>
      ) : (
        <Card>
          <>
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

              <Tab value="blocked" label="Bloqueado" />
              <Tab value="financial_blocked" label="Bloq. Financeiro" />
              <Tab value="documentation_blocked" label="Bloq. Documentação" />

              <Tab value="rated" label="Avaliado" />
              <Tab value="no_rated" label="Não Avaliado" />
            </Tabs>

            <Scrollbar>
              <TableContainer sx={{ minWidth: 900 }}>
                <Table>
                  <CompanyListHead headLabel={TABLE_HEAD} />
                  <TableBody>
                    {filteredCompanies
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: CompanyProps) => {
                        const { id, razao, cnpj, situacao, cadastro_valido, updated_at } = row;

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
                            <TableCell style={{ minWidth: 100 }}>
                              {`${situacao}`.toUpperCase()}
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                              {cadastro_valido ? 'SIM' : 'NÃO'}
                            </TableCell>
                            <TableCell style={{ maxWidth: 100 }}>
                              {moment(updated_at).format('DD/MM/YYYY')}
                            </TableCell>

                            <TableCell align="right">
                              <CompanyMoreMenu onDelete={() => handleDeleteCompany(id)} id={id} />
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
              count={filteredCompanies.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, page) => setPage(page)}
              onRowsPerPageChange={(e) => handleChangeRowsPerPage}
            />
          </>
        </Card>
      )}
    </Container>
  </Page>
);

export default View;
