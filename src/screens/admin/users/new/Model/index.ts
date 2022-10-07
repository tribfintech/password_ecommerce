export interface AdministrativeUsersProps {
  ativo: boolean;
  celular: string;
  cpf: string;
  created_at: any;
  email: string;
  id: number;
  nome: string;
  updated_at: any;
  ultimo_acesso: {
    ip: string;
    last_access: string;
  };
  grupo_permissao: {
    id: number;
    descricao: string;
    permissoes: string;
    deleted_at: string | null;
    updated_at: string;
  };
}

export interface GroupPermissionsProps {
  id: number;
  descricao: string;
  permissoes: string;
}

export interface NewUserViewProps {
  loading: boolean;
  typePage: string;
  listGroups: GroupPermissionsProps[];
  selected?: AdministrativeUsersProps;
}
