import {
  CompanyClientsResponseProps,
  CompanyGroupListResponseProps,
  CompanyUsersListResponseProps
} from 'services/request/models/response';

export interface UserStateProps {
  permissionsLoading: boolean;
  groups: CompanyGroupListResponseProps[];
  groupsLoading: boolean;
  users: CompanyUsersListResponseProps[];
  usersLoading: boolean;
}

export interface CompanyClientsStateProps {
  loading: boolean;
  clients: CompanyClientsResponseProps[];
}

interface ClientGroupPermissionProps {
  id: number;
  descricao: string;
  permissoes: string;
  deleted_at: string | null;
  updated_at: string | null;
}

export interface ProfileIntegratorStateProps {
  loading: boolean;
  id: number;
  nome: string;
  celular: string;
  cpf: string;
  email: string;
  ativo?: boolean;
  empresa_cliente_id?: number;
  grupo_permissao?: ClientGroupPermissionProps;
  deleted_at?: string | null;
  updated_at?: string | null;
}
