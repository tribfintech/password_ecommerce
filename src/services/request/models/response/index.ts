import { ProfileAdminStateProps } from 'services/store/models/admin';
import { ProfileClientStateProps } from 'services/store/models/client';
import { ProfileIntegratorStateProps } from 'services/store/models/integrator';

export interface LoginResponseProps {
  message: string;
  token: {
    value: string;
    expires: string;
  };
  user: {
    id: number;
    nome: string;
    cpf: string;
    celular: string;
    email: string;
    data_nascimento: string;
    created_at: string;
    updated_at: string;
  };
}

export interface CompaniesListResponseProps {
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

export interface LoginCompanyResponseProps {
  message: string;
  token: {
    value: string;
    expires: string;
  };
  user: {
    id: number;
    nome: string;
    cpf: string;
    celular: string;
    email: string;
    ativo: boolean;
    integrador_id: number;
    grupo_permissao: number;
    deleted_at?: string;
    created_at: string;
    updated_at: string;
  };
  permissions: string;
}

export interface CompanyPermissionsResponseProps {
  permissao: string;
  area: string;
  tipo: string;
  detalhes: string;
}

export interface ClientPermissionsResponseProps {
  permissao: string;
  area: string;
  tipo: string;
  detalhes: string;
}

export interface CompanyGroupListResponseProps {
  id: string;
  descricao: string;
  permissoes: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface ClientGroupListResponseProps {
  id: string;
  descricao: string;
  permissoes: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyIndividualResponseProps {
  id: string;
  descricao: string;
  permissoes: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyUsersListResponseProps {
  ativo: boolean;
  integrador_id: number;
  grupo_permissao: number;
  deleted_at: string;
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
  created_at: string;
  updated_at: string;
}

export interface ClientUsersResponseProps {
  id: number;
  nome: string;
  cpf: string;
  celular: string;
  email: string;
  ativo: boolean;
  empresa_cliente_id: number;
  grupo_permissao: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompanyNewUserResponseProps {
  message: string;
}

export interface CompanyUserEditResponseProps {
  message: string;
}

export interface CompanyUserRemoveResponseProps {
  message: string;
}

export interface CompanyClientsResponseProps {
  ativo: boolean;
  integrador_id: number;
  grupo_permissao: number;
  deleted_at: string;
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
  created_at: string;
  updated_at: string;
}

export interface CompanyCreateClientResponseProps {
  message: string;
}

export interface CompanyRemoveClientResponseProps {
  message: string;
}

export interface LoginClientResponseProps {
  message: string;
  token: {
    value: string;
    expires: string;
  };
  user: {
    id: number;
    nome: string;
    cpf: string;
    celular: string;
    email: string;
    ativo: boolean;
    integrador_id: number;
    grupo_permissao: number;
    deleted_at?: string;
    created_at: string;
    updated_at: string;
  };
  permissions: string;
}

export interface AdminCompanyCreateResponseProps {
  message: string;
}

export interface AdministrativeRecoveryResponseProps {
  message: string;
}

export interface ProfileEditResponseProps {
  message: string;
}

export interface ProfileAdminResponseProps extends ProfileAdminStateProps {}

export interface ProfileClientResponseProps extends ProfileClientStateProps {}

export interface ProfileIntegratorResponseProps extends ProfileIntegratorStateProps {}

export interface ProfileChangePasswordResponseProps extends ProfileEditResponseProps {}
