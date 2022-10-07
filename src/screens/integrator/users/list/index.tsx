import useSettings from 'hooks/useSettings';
import React, { useEffect, useState } from 'react';
import { filter as filterLodash } from 'lodash';
import endpoints from 'services/request/endpoints';
import { axiosInstance } from 'services/instance';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'services/request/baseQuery';
import { fetchUsers } from 'services/store/actions/integrator/user.action';
import View from './View';

const CompanyListUsers: React.FC = () => {
  const { themeStretch } = useSettings();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [currentTab, setCurrentTab] = useState('active');
  const [loadingStatus, setLoadingStatus] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [users, usersLoading] = useAppSelector((state) => [
    state.UsersIntegrator.users,
    state.UsersIntegrator.usersLoading
  ]);

  const getList = async () => {
    dispatch(fetchUsers());
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setList(users);
  }, [users]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const TABLE_HEAD = [
    { id: 'id', label: 'Cód.', alignRight: false },
    { id: 'name', label: 'Nome', alignRight: false },
    { id: 'cpf', label: 'CPF', alignRight: false },
    { id: 'email', label: 'E-mail', alignRight: false },
    { id: 'updated_at', label: 'Atualizado em', alignRight: false },
    { id: '', label: '', alignRight: false }
  ];

  function applySortFilter(array: any[], query: string) {
    const stabilizedThis = array.map((el, index) => [el, index] as const);
    if (query) {
      return filterLodash(
        array,
        (_user) => _user.nome.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilter = (filter: string) => {
    setFilter(filter);
  };

  const handleDelete = async (userId: number) => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.integrator.user}/${userId}`;

    try {
      const { status, data } = await axiosInstance.delete(endpoint);

      if (status === 200) {
        enqueueSnackbar('Cadastro removido com sucesso!', {
          variant: 'success'
        });
        navigate(0);
      }
    } catch (error) {
      console.log('Error', error);
      enqueueSnackbar('Ocorreu um problema.', {
        variant: 'error'
      });
    }
  };

  const handleToggleStatus = async (userId: string, status: boolean) => {
    setLoadingStatus(true);
    const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.integrator.user}/${userId}/change-status`;

    const payload = {
      ativo: !status
    };

    try {
      const { status, data } = await axiosInstance.put(endpoint, payload);

      if (status === 200) {
        enqueueSnackbar(data.message, {
          variant: 'success'
        });
        navigate(0);
        setLoadingStatus(false);
      }
    } catch (error) {
      console.log('Error', error);
      enqueueSnackbar('Ocorreu um problema.', {
        variant: 'error'
      });
      setLoadingStatus(false);
    }
  };

  const filteredList = list.filter((el) => {
    const { nome, email, cpf, ativo } = el;

    if (currentTab === 'active') {
      return (
        ativo === true &&
        (`${nome}`.toLowerCase().includes(`${filter}`.toLowerCase()) ||
          `${email}`.toLowerCase().includes(`${filter}`.toLowerCase()) ||
          `${cpf}`.toLowerCase().includes(`${filter}`.toLowerCase()))
      );
    }

    if (currentTab === 'inactive') {
      return (
        ativo === false &&
        (`${nome}`.toLowerCase().includes(`${filter}`.toLowerCase()) ||
          `${email}`.toLowerCase().includes(`${filter}`.toLowerCase()) ||
          `${cpf}`.toLowerCase().includes(`${filter}`.toLowerCase()))
      );
    }

    return (
      `${nome}`.toLowerCase().includes(`${filter}`.toLowerCase()) ||
      `${email}`.toLowerCase().includes(`${filter}`.toLowerCase()) ||
      `${cpf}`.toLowerCase().includes(`${filter}`.toLowerCase())
    );
  });

  return (
    <View
      {...{
        themeStretch,
        selected,
        setSelected,
        list,
        filteredList,
        TABLE_HEAD,
        applySortFilter,
        handleFilter,
        handleDelete,
        handleToggleStatus,
        isLoading: usersLoading,
        isNofilterResult: false,
        page,
        rowsPerPage,
        setRowsPerPage,
        setCurrentTab,
        currentTab,
        emptyRows,
        filter,
        handleChangeRowsPerPage,
        setFilter,
        setPage,
        loadingStatus
      }}
    />
  );
};

export default CompanyListUsers;
