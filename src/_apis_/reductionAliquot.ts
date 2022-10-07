import mock from './mock';
import mockData from '../utils/mock-data';
/**
 *  result.id_regra := query.FieldByName('ID_ITEM').AsInteger;
    result.nome_regra := query.FieldByName('ITEM').AsString;
    result.ncm := query.FieldByName('NCM').AsString;
    result.id_subcapitulo := query.FieldByName('ID_SUBCAPITULO').AsInteger;
    result.nome_subcapitulo  := query.FieldByName('NOME_SUBCAPITULO').AsString;
    result.aliquota  := query.FieldByName('ALIQ').AsFloat;
    result.id_capitulo := query.FieldByName('ID_CAPITULO').AsInteger;
    result.nome_capitulo  := query.FieldByName('NOME_CAPITULO').AsString;
 */
const aliquots = [...Array(1)].map((_, index) => ({
  idRule: mockData.id(index),
  nameRule: `Regra de calculo ${index}`,
  ncm: `NCM ${index}`,
  idSubchapter: mockData.id(index),
  nameSubchapter: `Subcapitulo ${index}`,
  aliquot: Number((Math.random() * 10).toFixed(2)),
  idChapter: mockData.id(index),
  nameChapter: `Capitulo ${index}`,
  createdAt: mockData.time(index).getTime()
}));

mock.onGet('/api/reductionAliquot').reply(200, aliquots);
