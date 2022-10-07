interface ClientGroupPermissionProps {
  id: number;
  descricao: string;
  permissoes: string;
  deleted_at: string | null;
  updated_at: string | null;
}

export interface ProfileAdminStateProps {
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
