import { v4 as uuidv4 } from 'uuid';
import { ImporterType } from '../@types/importer';

export class ImporterTypeImp implements ImporterType {
  name: string;

  status: string; // 'pending' | 'success' | 'error'

  filePath: string; // path of stored file

  valor: number;

  emissao: string;

  prestador: string;

  id: string = uuidv4();

  createdAt: string = new Date().toString();

  constructor(
    name: string,
    status: string,
    filePath: string,
    valor: number,
    emissao: string,
    prestador: string
  ) {
    this.name = name;
    this.status = status;
    this.filePath = filePath;
    this.valor = valor;
    this.emissao = emissao;
    this.prestador = prestador;
  }
}
