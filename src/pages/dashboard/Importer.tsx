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
  Checkbox,
  FormControl,
  TextField,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { TableListToolbar } from 'components/_dashboard/tables';
import SearchNotFound from 'components/SearchNotFound';
import { useSnackbar } from 'notistack5';
import { getImporterList, setImporterState } from 'redux/slices/importer';
import { useSelector } from 'react-redux';
import { fCurrency } from 'utils/formatNumber';
import { format } from 'date-fns';
import { CheckRounded } from '@material-ui/icons';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { RootState, useDispatch } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// types
import { ImportedFile, ImporterStatus, ImporterType } from '../../@types/importer';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Scrollbar from '../../components/Scrollbar';
import {
  ImporterActions,
  ImporterListHead,
  ImporterMoreMenu,
  ImporterModalSelectFiles
} from '../../components/_dashboard/importer';
// controller
import {
  applySortFilter,
  getSelection,
  readFilesFromEvent,
  importFiles,
  validateXmlFiles,
  prepareFilesToImport
} from '../../controllers/importer';

const TABLE_HEAD = [
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'name', label: 'Nome', alignRight: false },
  { id: 'emissao', label: 'Emissão', alignRight: false },
  { id: 'valor', label: 'Valor liquido', alignRight: false },
  { id: 'prestador', label: 'Prestador', alignRight: false },
  { id: '' }
];

export default function Importer() {
  const { themeStretch } = useSettings();
  const [selected, setSelected] = useState<string[]>([]);
  const [filterImporter, setFilterImporter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [reading, setReading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filesLength, setFilesLength] = useState(0);
  const [filesReaded, setFilesReaded] = useState(0);
  const { importerList: files } = useSelector((state: RootState) => state.importer);
  const [filesToImport, setFilesToImport] = useState<ImportedFile[]>([]);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImporterList());
  }, [dispatch]);

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const selected = files.map((n) => n.name);
      setSelected(selected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    const newSelected: string[] = getSelection(selectedIndex, selected, name);
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteImporter = (importId: string) => {
    // dispatch(deleteUser(importId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - files.length) : 0;

  const filteredImporter = applySortFilter(files, filterImporter);

  const isImporterNotFound = filteredImporter.length === 0 && filterImporter !== '';

  const handleFilterByName = (filterName: string) => {
    setFilterImporter(filterName);
  };

  const onSelectFiles = async (event: any) => {
    if (!event || !event.target) {
      console.error('onChangeElement: event or event.target is undefined');
      enqueueSnackbar('Falha ao carregar arquivos', {
        variant: 'warning',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        }
      });
      return;
    }

    const localFilesLength = event.target.files.length;

    if (localFilesLength === 0) {
      enqueueSnackbar('Nenhum arquivo encontrado', {
        variant: 'warning',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        }
      });

      return;
    }

    setShowModal(true);
    setFilesLength(localFilesLength);
    setReading(true);

    let files = await readFilesFromEvent(
      event.target.files,
      (index, lenght) => {
        setFilesReaded(index);
      },
      '.xml'
    );

    setReading(false);
    setAnalyzing(true);
    files = await validateXmlFiles(files, (file, valid, currentIndex) => {
      setFilesReaded(Number(currentIndex));
    });

    setAnalyzing(false);

    if (files.length !== localFilesLength) {
      enqueueSnackbar(
        `${localFilesLength - files.length} de ${localFilesLength} arquivos não foram carregados`,
        {
          variant: 'warning',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          },
          autoHideDuration: 7000
        }
      );
    }

    setFilesToImport(files);
  };

  const onClickShowItem = (item: ImporterType) => {
    // const url = URL.createObjectURL(item.file);
    // item.data = url;
    window.open(item.filePath, '_blank');
    // setTimeout(() => {
    //   URL.revokeObjectURL(url);
    // }, 1000);
  };

  const startImportFiles = (filesToImport: ImportedFile[]) => {
    enqueueSnackbar('Importando arquivos em segundo plano, NÃO saia da plataforma.', {
      variant: 'warning',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
      },
      autoHideDuration: 7000
    });
    const preparedFiles = prepareFilesToImport(filesToImport);
    let newStateFiles = [...files, ...preparedFiles];
    dispatch(setImporterState(newStateFiles));

    importFiles(
      preparedFiles,
      (_currentIndex, file) => {
        console.log(`Importando arquivo ${file.name}`);
        newStateFiles = newStateFiles.map((stateFile) => {
          if (stateFile.name === file.name) {
            stateFile.status = ImporterStatus.IMPORTING;
          }
          return stateFile;
        });

        dispatch(setImporterState(newStateFiles));
      },
      (currentIndex, file) => {
        console.log(`Arquivo ${file.name} importado com sucesso`);
        newStateFiles = newStateFiles.map((stateFile) => {
          if (stateFile.name === file.name) {
            stateFile.status = ImporterStatus.SUCCESS;
          }

          return stateFile;
        });

        dispatch(setImporterState(newStateFiles));
      }
    );
  };

  return (
    <Page title="Recursos: Importação de XML (NF-e)">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Recursos - Importaçâo de XML (NF-e)"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Importaçâo de XML (NF-e)' }
          ]}
          action={<ImporterActions onSelectFiles={onSelectFiles} />}
        />

        <ImporterModalSelectFiles
          open={showModal}
          reading={reading}
          analyzing={analyzing}
          currentFile={filesReaded}
          filesLength={filesLength}
          onClose={(items) => {
            setShowModal(false);
            if (items) {
              startImportFiles(items);
            }
          }}
          files={filesToImport}
          onSelectFiles={onSelectFiles}
        />

        <Card>
          <TableListToolbar
            numSelected={selected.length}
            filterName={filterImporter}
            onFilterName={handleFilterByName}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <ImporterListHead
                  headLabel={TABLE_HEAD}
                  rowCount={files.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredImporter
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { name, id, status, valor, emissao, prestador } = row;

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
                          <TableCell component="th" scope="row" padding="none" align="center">
                            {/* {status !== ImporterStatus.IMPORTING &&
                              status !== ImporterStatus.SUCCESS &&
                              status} */}

                            {status === ImporterStatus.IMPORTING && <CircularProgress size={25} />}

                            {status === ImporterStatus.SUCCESS && <CheckRounded color="primary" />}

                            {status === ImporterStatus.PENDING && (
                              <PauseCircleFilledIcon color="primary" />
                            )}
                          </TableCell>
                          <TableCell>{name}</TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            {format(new Date(emissao), 'dd/MM/yyyy')}
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            {fCurrency(valor)}
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            {prestador}
                          </TableCell>

                          <TableCell align="right">
                            <ImporterMoreMenu
                              onDelete={() => handleDeleteImporter(name)}
                              importerName={name}
                              onClickShow={() => onClickShowItem(row)}
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
                {(files.length === 0 || isImporterNotFound) && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound
                          searchQuery={filterImporter}
                          showHelp={isImporterNotFound}
                          notFoundText="Nenhum arquivo encontrado"
                        />
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
            count={files.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        <Typography variant="h5" sx={{ marginTop: 6, paddingLeft: 3 }}>
          Registros Importados
        </Typography>

        <FormControl sx={{ m: 1, minWidth: 973, paddingTop: 1 }}>
          <TextField id="text" multiline rows={4} defaultValue="Sem dados no momento" />
        </FormControl>
      </Container>
    </Page>
  );
}
