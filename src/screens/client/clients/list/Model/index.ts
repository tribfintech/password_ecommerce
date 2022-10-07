import React from 'react';
import { CompanyClientsResponseProps } from 'services/request/models/response';

export interface CompanyProps {
  id: number;
  cnpj: string;
  razao: string;
  fantasia: string;
  endereco: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  regime_tributario: string;
  contribuinte_icms: string;
  ie: string;
  fundado_em: string;
  email_cnpj: string;
  mei: boolean;
  nome_contato: string;
  telefone_fixo: string;
  telefone_celular: string;
  email_contato: string;
  chegou_via: string;
  aceite_termos: boolean;
  cadastro_valido: boolean;
  situacao: string;
  created_at: string;
  updated_at: string;
}

interface tableHeadProps {
  id: string;
  label?: string;
  alignRight?: boolean;
}

export interface CompaniesListViewProps {
  TABLE_HEAD: tableHeadProps[];
  themeStretch: any;
  selected: any;
  setSelected: any;
  page: any;
  setPage: any;
  filterCompany: any;
  setFilterCompany: any;
  rowsPerPage: any;
  setRowsPerPage: any;
  applySortFilter: any;
  handleChangeRowsPerPage: any;
  handleFilterByCompany: any;
  handleDelete: any;
  emptyRows: any;
  listFiltered: CompanyClientsResponseProps[];
  isListNotFound: any;
  isLoading: boolean;
  currentTab: string;
  setCurrentTab: (value: string) => void;
}
