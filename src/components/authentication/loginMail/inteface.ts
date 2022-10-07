import { LoginProps } from 'screens/admin/unauthenticated/login/Model';

export interface LoginFormProps {
  SubmitCallback: (value: any) => Promise<boolean>;
}
