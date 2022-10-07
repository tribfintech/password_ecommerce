export interface LoginProps {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginViewProps {
  SubmitCallback: (values: LoginProps) => Promise<boolean>;
}
