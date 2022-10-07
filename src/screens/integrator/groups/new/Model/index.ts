export interface PermissionsListProps {
  permissao: string;
  area: string;
  tipo: string;
  detalhes: string;
}

export interface GroupPermissionsProps {
  id: number;
  descricao: string;
  permissoes: string;
}

export interface NewGroupViewProps {
  loading: boolean;
  typePage: string;
  permissionsList: PermissionsListProps[];
  permissions: string[];
  addPermission: (value: PermissionsListProps) => void;
  selected?: GroupPermissionsProps;
}
