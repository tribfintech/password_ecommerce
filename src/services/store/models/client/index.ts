import {
  ClientGroupListResponseProps,
  ClientUsersResponseProps
} from 'services/request/models/response';

export interface UserStateProps {
  permissionsLoading: boolean;
  groups: ClientGroupListResponseProps[];
  groupsLoading: boolean;
  users: ClientUsersResponseProps[];
  usersLoading: boolean;
}

interface ClientGroupPermissionProps {
  id: number;
  descricao: string;
  permissoes: string;
  deleted_at: string | null;
  updated_at: string | null;
}

export interface ProfileClientStateProps {
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
