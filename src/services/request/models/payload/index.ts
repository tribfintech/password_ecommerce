export interface LoginPayloadProps {
  email: string;
  senha: string;
}

export interface LoginCompanyPayloadProps {
  cpf: string;
  senha: string;
}

export interface companyCreatePayloadProps {
  cnpj: string;
  razao: string;
  fantasia: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  regime_tributario: string;
  contribuinte_icms: string;
  fundado_em: string;
  email_cnpj: string;
  mei: boolean;
  nome_contato: string;
  telefone_celular: string;
  email_contato: string;
  senha: string;
  chegou_via: string;
  aceite_termos: boolean;
  ie: string;
  telefone_fixo: string;
}

export interface adminCompanyCreatePayloadProps {
  ativo: boolean;
  grupo_permissao: number;
  id?: number;
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
}

export interface GetCompanyPayloadProps {
  id: string;
}

export interface UpdateCompanyPayloadProps {
  nome_contato?: string;
  email_contato?: string;
  telefone_fixo?: string;
  telefone_celular?: string;
  situacao?: string;
  cadastro_valido?: boolean;
  id?: string;
}

export interface NewAdministrativeUserPayloadProps {
  email: string;
  nome: string;
  cpf: string;
  celular: string;
  grupo_permissao: number;
}
export interface CompanyNewGroupPayloadProps {
  descricao: string;
  permnissoes: Array<string>;
}

export interface CompanyGroupIndividualPayloadProps {
  id: number;
}
export interface CompanyEditGroupPayloadProps {
  descricao: string;
  permnissoes: Array<string>;
}

export interface CompanyNewUserPayloadProps {
  email: string;
  nome: string;
  cpf: string;
  celular: string;
  grupo_permissao: number;
  senha: string;
}

export interface CompanyUserPayloadProps {
  id: number;
}

export interface CompanyEditUserPayloadProps {
  email: string;
  nome: string;
  cpf: string;
  celular: string;
  senha?: string;
  grupo_permissao: number;
  ativo: boolean;
  id: number;
}

export interface CompanyUserDeletePayloadProps {
  id: number;
}

export interface CompanyCreateClientPayloadProps {
  cnpj: string;
  razao: string;
  fantasia: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  regime_tributario: string;
  contribuinte_icms: string;
  fundado_em: string;
  email_cnpj: string;
  mei: boolean;
  nome_contato: string;
  telefone_celular: string;
  email_contato: string;
  senha: string;
  ie: string;
  telefone_fixo: string;
  grupo_permissao: number;
}

export interface CompanyUpdateClientPayloadProps {
  cnpj: string;
  razao: string;
  fantasia: string;
  responsavel_nome: string;
  responsavel_telefone: string;
  id: number;
}

export interface CompanyRemoveClientPayloadProps {
  id: number;
}

export interface LoginClientPayloadProps {
  cpf: string;
  senha: string;
}

export interface AdministrativeRecoveryPayloadProps {
  email: string;
}

export interface ProfileEditPayloadProps {
  nome: string;
  email: string;
  celular: string;
}

export interface ProfileChangePasswordPayloadProps {
  atual: string;
  nova: string;
}
