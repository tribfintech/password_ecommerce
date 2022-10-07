import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { ImporterTypeImp } from '@classes/ImporterTypeImp';
import { FileData } from '@classes/FileData';
import { ImportedFile, ImporterType } from '../@types/importer';

export const readFilesFromEvent = async (
  files: Array<File> | null,
  onReading: (currentIndex: number, length: number) => void,
  accept: string = '*'
): Promise<Array<FileData>> => {
  if (!files || files.length === 0) {
    return [];
  }

  const reader = new FileReader();
  let file: any;
  let i = 1;
  const resultArray = [];

  for (file of files) {
    if (file.type.match(new RegExp(accept))) {
      // eslint-disable-next-line no-await-in-loop
      const fileData = await getDataFromFile(file, reader);
      resultArray.push(
        new FileData(file, fileData, file.webkitRelativePath || `<Dispositivo>/${file.name}`)
      );
    } else {
      console.warn(`File ${file.name} is not accepted.`);
    }

    onReading(i, files.length);
    i++;
  }

  return resultArray;
};

const getDataFromFile = (file: File, reader: FileReader): Promise<string> => {
  reader.readAsText(file);

  return new Promise<any>((resolve) => {
    reader.onload = () => {
      const data = reader.result;
      resolve(data);
    };
  });
};

export const validateXmlFiles = async (
  files: Array<FileData>,
  onValidating: (file?: FileData, valid?: boolean, currentIndex?: number, total?: number) => void
): Promise<Array<FileData>> => {
  const validatedFiles = new Array<FileData>();
  const parser = new XMLParser();
  let i = 1;
  for (const file of files) {
    const xml = file.data;
    // eslint-disable-next-line no-await-in-loop
    await sleep(100);
    const isValid = XMLValidator.validate(xml);
    if (typeof isValid === 'boolean' && isValid) {
      const xmlObj = parser.parse(xml);
      file.xmlObj = xmlObj;
      console.log(file);
      validatedFiles.push(file);
      onValidating(file, true, i + 1, files.length);
    } else {
      console.warn(`File ${file.file.name} is not valid.`);
      onValidating(file, false, i, files.length);
    }
    i++;
  }

  return validatedFiles;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatMoney = (value: number) => {
  const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  return formatter.format(value ?? 0);
};

export const applySortFilter = (array: ImporterType[], query: string) => {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  if (query) {
    return array.filter(
      (_importer) => _importer.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
};

export const getSelection = (selectedIndex: number, selected: string[], name: string) => {
  let newSelected: string[] = [];
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  return newSelected;
};

export const prepareFilesToImport = (files: ImportedFile[]) => {
  const filesToImport = [];
  for (const file of files) {
    const impoterItem = new ImporterTypeImp(
      file.file.name,
      'pending',
      file.path,
      file.xmlObj.CompNfse?.Nfse?.InfNfse?.ValoresNfse?.ValorLiquidoNfse,
      file.xmlObj?.CompNfse?.Nfse?.InfNfse?.DataEmissao,
      file.xmlObj?.CompNfse?.Nfse?.InfNfse?.PrestadorServico?.NomeFantasia
    );
    filesToImport.push(impoterItem);
  }

  return filesToImport;
};

export const importFiles = async (
  files: ImporterType[],
  onUploadFileStart: (currentIndex: number, file: ImporterType) => void,
  onUploadFileEnd: (currentIndex: number, file: ImporterType) => void
) => {
  for (const file of files) {
    onUploadFileStart(files.indexOf(file), file);
    // eslint-disable-next-line no-await-in-loop
    await sleep(2000); // TODO: Simulate upload
    onUploadFileEnd(files.indexOf(file), file);
  }
};
