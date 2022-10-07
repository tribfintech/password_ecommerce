export type ImportedFile = {
  id: string;
  file: File;
  data: string;
  path: string;
  status: string;
  xmlObj?: any;
};

export type ImporterType = {
  id: string;
  name: string;
  status: string; // 'pending' | 'success' | 'error'
  filePath: string; // path of stored file
  valor: number;
  emissao: string;
  prestador: string;
  createdAt: string;
};

export type ImporterActionsProps = {
  onSelectFiles: (event: React.ChangeEvent<HTMLInputElement>) => void;
  insideModal?: boolean;
};

export interface ImportModalProps extends ImporterActionsProps {
  open: boolean;
  reading: boolean;
  analyzing: boolean;
  currentFile: number;
  filesLength: number;
  files: Array<ImportedFile>;
  onClose: (items?: Array<ImportedFile>) => void;
}

export enum ImporterStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
  IMPORTING = 'importing'
}
