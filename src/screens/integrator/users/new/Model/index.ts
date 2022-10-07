export interface CompanyUserProps {
  id: number;
  nome: string;
  cpf: string;
  celular: string;
  email: string;
  ativo: boolean;
  integrador_id?: number;
  deleted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  // ultimo_acesso: {
  //   ip: string;
  //   last_access: string;
  // };
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

export interface CompanyNewUserViewProps {
  loading: boolean;
  typePage: string;
  listGroups: GroupPermissionsProps[];
  selected?: CompanyUserProps;
  changePassword: boolean;
  setChangePassword: any;
}
