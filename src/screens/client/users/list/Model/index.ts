import React from 'react';

interface tableHeadProps {
  id: string;
  label?: string;
  alignRight?: boolean;
}

export interface UsersViewProps {
  TABLE_HEAD: tableHeadProps[];
  themeStretch: any;
  list: any[];
  page: any;
  setPage: any;
  filter: string;
  setFilter: any;
  rowsPerPage: any;
  setRowsPerPage: any;
  applySortFilter: any;
  handleChangeRowsPerPage: any;
  handleFilter: any;
  handleDelete: any;
  handleToggleStatus: any;
  emptyRows: any;
  filteredList: any[];
  isNofilterResult: boolean;
  isLoading: boolean;
  currentTab: string;
  setCurrentTab: (value: string) => void;
  selected: any;
  setSelected: any;
  loadingStatus: boolean;
}
