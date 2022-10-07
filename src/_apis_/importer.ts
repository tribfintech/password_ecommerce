import mock from './mock';
import mockData from '../utils/mock-data';
import { ImporterStatus } from '../@types/importer';

const importers = [...Array(2)].map((_, index) => ({
  id: mockData.id(index),
  name: `Arquivo de importação ${index}.xml`,
  // eslint-disable-next-line no-nested-ternary
  status: ImporterStatus.SUCCESS,
  filePath: `upload/${mockData.id(index)}.xml`,
  valor: Number((Math.random() * 100).toFixed(2)),
  emissao: mockData.time(index).getTime(),
  prestador: `Prestador de serviço ${index}`,
  createdAt: mockData.time(index).getTime()
}));

mock.onGet('/api/importers').reply(200, { importers });
