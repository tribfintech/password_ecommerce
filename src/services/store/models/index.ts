export interface AuthAdminProps {
  token: {
    value: string;
    expires: string;
  };
  user: {
    celular: string;
    cpf: string;
    created_at: string;
    data_nascimento: string;
    email: string;
    id: number;
    nome: string;
    updated_at: string;
  };
  loading: boolean;
  signed: boolean;
}

export interface AuthCompanyProps {
  token: {
    value: string;
    expires: string;
  };
  user: {
    id: number;
    nome: string;
    celular: string;
    cpf: string;
    email: string;
    ativo: boolean;
  };
  permissions: string;
  loading: boolean;
  signed: boolean;
}

export interface AuthClientProps {
  token: {
    value: string;
    expires: string;
  };
  user: {
    id: number;
    nome: string;
    celular: string;
    cpf: string;
    email: string;
    ativo: boolean;
  };
  permissions: string;
  loading: boolean;
  signed: boolean;
}
