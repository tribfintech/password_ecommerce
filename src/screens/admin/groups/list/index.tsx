import useSettings from 'hooks/useSettings';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'redux/store';
import { filter as filterLodash } from 'lodash';
import { useGetUsersAdminListQuery } from 'services/rtk/usersadmin.rtk';
import endpoints from 'services/request/endpoints';
import { axiosInstance } from 'services/instance';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router';
import { PATH_ADMIN } from 'routes/paths';
import View from './View';

const GroupsList: React.FC = () => {
  const { themeStretch } = useSettings();
  const [selected, setSelected] = useState<string[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [currentTab, setCurrentTab] = useState('active');

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data: adminListRequest, isLoading } = useGetUsersAdminListQuery(null);

  useEffect(() => {
    if (adminListRequest) {
      setList(adminListRequest);
    }
  }, [adminListRequest]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const dispatch = useDispatch();

  const TABLE_HEAD = [
    { id: 'id', label: 'Cód.', alignRight: false },
    { id: 'descricao', label: 'Descrição', alignRight: false },
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

  const handleDelete = async (userId: string) => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.administrative.groups}/${userId}`;

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

  const filteredList = list.filter((el) => {
    const { descricao, deleted_at } = el;

    if (currentTab === 'active') {
      return (
        deleted_at === null && `${descricao}`.toLowerCase().includes(`${filter}`.toLowerCase())
      );
    }

    if (currentTab === 'inactive') {
      return (
        deleted_at &&
        deleted_at !== null &&
        `${descricao}`.toLowerCase().includes(`${filter}`.toLowerCase())
      );
    }

    return `${descricao}`.toLowerCase().includes(`${filter}`.toLowerCase());
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
        isLoading,
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
        setPage
      }}
    />
  );
};

export default GroupsList;
