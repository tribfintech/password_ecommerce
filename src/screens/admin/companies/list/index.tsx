import useSettings from 'hooks/useSettings';
import React, { useEffect, useState } from 'react';
import { deleteUser } from 'redux/slices/user';
import { useDispatch } from 'redux/store';
import { filter } from 'lodash';
import { useGetCompaniesListQuery } from 'services/rtk/companies.rtk';
import { CompaniesListResponseProps } from 'services/request/models/response';
import { CompanyProps } from './Model';
import View from './View';

const CompaniesList: React.FC = () => {
  const { themeStretch } = useSettings();
  const [selected, setSelected] = useState<string[]>([]);
  const [CompaniesList, setCompaniesList] = useState<CompaniesListResponseProps[]>([]);
  const [page, setPage] = useState(0);
  const [filterCompany, setFilterCompany] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [currentTab, setCurrentTab] = useState('default');

  const dispatch = useDispatch();

  const { data: CompaniesRequest, isLoading, isSuccess } = useGetCompaniesListQuery(null);

  useEffect(() => {
    if (CompaniesRequest) {
      setCompaniesList(CompaniesRequest);
    }
  }, [CompaniesRequest]);

  const TABLE_HEAD = [
    { id: 'id', label: 'Cód.', alignRight: false },
    { id: 'razao', label: 'Razão Social', alignRight: false },
    { id: 'cnpj', label: 'CNPJ', alignRight: false },
    { id: 'situacao', label: 'Situação', alignRight: false },
    { id: 'cadastro_valido', label: 'Validado', alignRight: false },
    { id: 'updated_at', label: 'Atualizado em', alignRight: false },
    { id: '', label: '', alignRight: false }
  ];

  function applySortFilter(array: CompanyProps[], query: string) {
    const stabilizedThis = array.map((el, index) => [el, index] as const);
    if (query) {
      return filter(
        array,
        (_company) => _company.razao.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const selected = CompaniesList.map((n) => n.razao);
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

  const handleFilterByCompany = (filterCompany: string) => {
    setFilterCompany(filterCompany);
  };

  const handleDeleteCompany = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - CompaniesList.length) : 0;

  const filteredCompanies = CompaniesList.filter((el) => {
    const { situacao, cadastro_valido, razao, fantasia, cnpj } = el;
    if (currentTab === 'active') {
      return (
        cadastro_valido === true &&
        situacao === 'normal' &&
        (`${el.razao}`.toLowerCase().includes(`${filterCompany}`.toLowerCase()) ||
          `${el.fantasia}`.includes(`${filterCompany}`.toLowerCase()) ||
          `${el.cnpj}`.includes(filterCompany) ||
          `${el.estado}`.includes(filterCompany))
      );
    }

    if (currentTab === 'inactive') {
      return (
        situacao === 'inativo' &&
        (`${el.razao}`.toLowerCase().includes(`${filterCompany}`.toLowerCase()) ||
          `${el.fantasia}`.includes(`${filterCompany}`.toLowerCase()) ||
          `${el.cnpj}`.includes(filterCompany) ||
          `${el.estado}`.includes(filterCompany))
      );
    }

    if (currentTab === 'rated') {
      return (
        cadastro_valido === true &&
        (`${el.razao}`.toLowerCase().includes(`${filterCompany}`.toLowerCase()) ||
          `${el.fantasia}`.includes(`${filterCompany}`.toLowerCase()) ||
          `${el.cnpj}`.includes(filterCompany) ||
          `${el.estado}`.includes(filterCompany))
      );
    }

    if (currentTab === 'no_rated') {
      return (
        cadastro_valido === false &&
        (`${el.razao}`.toLowerCase().includes(`${filterCompany}`.toLowerCase()) ||
          `${el.fantasia}`.includes(`${filterCompany}`.toLowerCase()) ||
          `${el.cnpj}`.includes(filterCompany) ||
          `${el.estado}`.includes(filterCompany))
      );
    }

    if (currentTab === 'blocked') {
      return (
        situacao === 'bloqueado' &&
        (`${el.razao}`.toLowerCase().includes(`${filterCompany}`.toLowerCase()) ||
          `${el.fantasia}`.includes(`${filterCompany}`.toLowerCase()) ||
          `${el.cnpj}`.includes(filterCompany) ||
          `${el.estado}`.includes(filterCompany))
      );
    }

    if (currentTab === 'financial_blocked') {
      return (
        situacao === 'bloqueado_financeiro' &&
        (`${el.razao}`.toLowerCase().includes(`${filterCompany}`.toLowerCase()) ||
          `${el.fantasia}`.includes(`${filterCompany}`.toLowerCase()) ||
          `${el.cnpj}`.includes(filterCompany) ||
          `${el.estado}`.includes(filterCompany))
      );
    }

    if (currentTab === 'documentation_blocked') {
      return (
        situacao === 'bloqueado_documentacao' &&
        (`${el.razao}`.toLowerCase().includes(`${filterCompany}`.toLowerCase()) ||
          `${el.fantasia}`.includes(`${filterCompany}`.toLowerCase()) ||
          `${el.cnpj}`.includes(filterCompany) ||
          `${el.estado}`.includes(filterCompany))
      );
    }

    return (
      `${el.razao}`.toLowerCase().includes(`${filterCompany}`.toLowerCase()) ||
      `${el.fantasia}`.includes(`${filterCompany}`.toLowerCase()) ||
      `${el.cnpj}`.includes(filterCompany) ||
      `${el.estado}`.includes(filterCompany)
    );
  });

  const isCompanyNotFound = filteredCompanies.length === 0;

  return (
    <View
      {...{
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
      }}
    />
  );
};

export default CompaniesList;
