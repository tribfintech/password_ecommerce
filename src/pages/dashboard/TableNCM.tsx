import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
  Checkbox
} from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product'; // Mudar

import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// @types
import { Product, ProductState } from '../../@types/products'; // Mudar
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  TableListHead,
  TableListToolbar,
  HeaderBreadcrumbs
} from '../../components/_dashboard/tables';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ncm', label: 'NCM', alignRight: false },
  { id: 'description', label: 'Descrição', alignRight: false },
  { id: 'ipi', label: 'IPI', alignRight: false },
  { id: 'startValidity', label: 'Início de Vigência', alignRight: false },
  { id: 'endValidity', label: 'Fim de Vigência', alignRight: false },
  { id: 'unitOfMeasurement', label: 'Unidade de medida', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------
function applySortFilter(array: Product[], query: string) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  if (query) {
    return filter(
      array,
      (_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function TableCSOSN() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const { products } = useSelector((state: { product: ProductState }) => state.product);
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const selected = products.map((n) => n.name);
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

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredName = applySortFilter(products, filterName);

  const isNameNotFound = filteredName.length === 0;

  return (
    <Page title="Cadastros: Tabelas Gerais">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Cadastros - Tabelas Gerais"
          links={[
            { name: 'Tabelas de Estados', href: PATH_DASHBOARD.tables.tableStates },
            {
              name: 'Tabela de CSOSN/CTS',
              href: PATH_DASHBOARD.tables.tableCSOSN
            },
            { name: 'Tabela de NCM' }
          ]}
        />

        <Card>
          <TableListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead
                  headLabel={TABLE_HEAD}
                  rowCount={products.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredName
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
                          <TableCell style={{ minWidth: 80 }}>
                            <Box
                              sx={{
                                py: 2,
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Typography variant="subtitle2" noWrap>
                                NCM
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell style={{ minWidth: 350 }}>{name}</TableCell>
                          <TableCell style={{ minWidth: 50 }}>IPI</TableCell>
                          <TableCell style={{ minWidth: 50 }}>01/01/2021</TableCell>
                          <TableCell style={{ minWidth: 50 }}>01/02/2021</TableCell>
                          <TableCell style={{ minWidth: 100 }}>Unidade de medida</TableCell>
                          <TableCell align="right">
                            <IconButton>
                              <Icon icon={moreVerticalFill} width={20} height={20} />
                            </IconButton>
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
                {isNameNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
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
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
