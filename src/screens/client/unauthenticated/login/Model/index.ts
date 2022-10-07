export interface LoginProps {
  cpf: string;
  password: string;
  remember?: boolean;
}

export interface LoginViewProps {
  SubmitCallback: (values: LoginProps) => Promise<boolean>;
}
