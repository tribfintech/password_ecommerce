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
}

export interface CertificateProps {
  product: string;
  model: string;
  media: string;
  validity: string;
  emission: string;
}
