export interface ProductProps {
  Id: number;
  Name: string;
}

export interface MediaTypeProps {
  iId: number;
  Id: string;
  Name: string;
  Pedido: number;
  Valor: number;
  Qtd: number;
  HashUsuario: string;
}

export interface HomeViewProps {
  a1MediaOption: string[];
  a3MediaOptions: string[];
  defaultValidities: string[];
  safeIdValidities: string[];
  handleCheckout: (values: CertificateProps) => void;
}

export interface CertificateProps {
  product: string;
  model: string;
  media: string;
  validity: string;
  emission: string;
}
