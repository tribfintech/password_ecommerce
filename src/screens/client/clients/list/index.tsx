import useSettings from 'hooks/useSettings';
import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { CompanyClientsResponseProps } from 'services/request/models/response';
import { useAppDispatch, useAppSelector } from 'services/request/baseQuery';
import { fetchClients, fetchDeleteClient } from 'services/store/actions/integrator/clients.action';
import endpoints from 'services/request/endpoints';
import { axiosInstance } from 'services/instance';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router';
import View from './View';
import { CompanyProps } from './Model';

const CompanyClientsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { themeStretch } = useSettings();
  const [selected, setSelected] = useState<string[]>([]);
  const [list, setList] = useState<CompanyClientsResponseProps[]>([]);
  const [page, setPage] = useState(0);
  const [filterCompany, setFilterCompany] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [currentTab, setCurrentTab] = useState('default');

  const [clients, loading] = useAppSelector((state) => [
    state.ClientsIntegrator.clients,
    state.ClientsIntegrator.loading
  ]);

  function callData() {
    dispatch(fetchClients());
  }

  useEffect(() => {
    callData();
  }, []);

  useEffect(() => {
    if (clients) {
      setList(clients);
    }
  }, [clients]);

  const TABLE_HEAD = [
    { id: 'id', label: 'Cód.', alignRight: false },
    { id: 'razao', label: 'Razão Social', alignRight: false },
    { id: 'cnpj', label: 'CNPJ', alignRight: false },
    { id: 'ativo', label: 'Ativo', alignRight: false },
    { id: 'updated_at', label: 'Atualizado em', alignRight: false },
    { id: '', label: '', alignRight: false }
  ];

  function applySortFilter(array: CompanyProps[], query: string) {
    const stabilizedThis = array.map((el, index) => [el, index] as const);
    if (query) {
      return filter(
        array,
        (_client) => _client.razao.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByCompany = (filterCompany: string) => {
    setFilterCompany(filterCompany);
  };

  const handleDelete = async (id: number) => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.integrator.clients}/${id}`;

    try {
      const { status, data } = await axiosInstance.delete(endpoint);

      if (status === 200) {
        enqueueSnackbar('Cadastro removido com sucesso!', {
          variant: 'success'
        });

        setTimeout(() => {
          navigate(0);
        }, 2000);
      }
    } catch (error) {
      console.log('Error', error);
      enqueueSnackbar('Ocorreu um problema.', {
        variant: 'error'
      });
    }

    dispatch(fetchDeleteClient({ id }));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const listFiltered = list.filter((el) => {
    const { ativo, razao, fantasia, cnpj } = el;
    if (currentTab === 'active') {
      return (
        ativo === true &&
        (`${razao}`.toLowerCase().includes(`${filterCompany}`.toLowerCase()) ||
          `${fantasia}`.includes(`${filterCompany}`.toLowerCase()) ||
          `${cnpj}`.includes(filterCompany))
      );
    }

    if (currentTab === 'inactive') {
      return (
        ativo === false &&
        (`${razao}`.toLowerCase().includes(`${filterCompany}`.toLowerCase()) ||
          `${fantasia}`.includes(`${filterCompany}`.toLowerCase()) ||
          `${cnpj}`.includes(filterCompany))
      );
    }

    if (currentTab === 'all') {
      return el;
    }

    return (
      `${razao}`.toLowerCase().includes(`${filterCompany}`.toLowerCase()) ||
      `${fantasia}`.includes(`${filterCompany}`.toLowerCase()) ||
      `${cnpj}`.includes(filterCompany)
    );
  });

  const isListNotFound = listFiltered.length === 0;

  return (
    <View
      {...{
        TABLE_HEAD,
        themeStretch,
        selected,
        setSelected,
        list,
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
        isListNotFound,
        isLoading: loading,
        currentTab,
        setCurrentTab
      }}
    />
  );
};

export default CompanyClientsList;
