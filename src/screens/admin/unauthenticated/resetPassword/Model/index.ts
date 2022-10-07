export type InitialValues = {
  email: string;
  afterSubmit?: string;
};

export type ResetPasswordFormProps = {
  fetchRecovery: (email: string) => any;
};

export interface AdminRecoveryViewProps {
  fetchRecovery: (email: string) => Promise<any>;
}
