import { v4 as uuidv4 } from 'uuid';
import { ImportedFile } from '../@types/importer';

export class FileData implements ImportedFile {
  id: string = uuidv4();

  file: File;

  data: string;

  path: string;

  status: string = 'pending';

  xmlObj?: {};

  constructor(file: File, data: string, path: string) {
    this.file = file;
    this.data = data;
    this.path = path;
  }
}
