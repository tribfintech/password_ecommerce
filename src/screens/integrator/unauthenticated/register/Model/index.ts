interface CompanyManager {
  id: string;
  avatarUrl: string;
  name: string;
  emailNfe: string;
  email: string;
  confirmEmail: string;
  phoneNumber: string;
  cellNumber: string;
  model: string;
  number: string;
  complemento: string;
  bairro: string;
  password: string;
  passwordConfirm: string;
  cnpj: string;
  cod: string;
  address: string;
  country: string;
  state: string;
  mei: string;
  dateIn: string;
  city: string;
  zipCode: string;
  company: string;
  companyName: string;
  isVerified: boolean;
  status: string;
  role: string;
  regimeTax: string;
  ie: string;
}
export interface RegisterProps {
  dataCnpj: {
    set: any;
  };
  dataAutocomplete: any;
  loading: boolean;
  consultCnpj: (value: string) => void;
}
