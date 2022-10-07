import axios from './axios';
import { fCurrency, fPercent, fShortenNumber } from './formatNumber';
/**
 * @param {number} reduction
 * @param {number} aliquotICMS
 * @returns {number}
 * #### Exemplos:
 * - 4,10 divide por 17 vezes 100 que da o valor de 24,12%
 * - Mais um exemplo vamos supor qur temos um produto de 1200 reais, a aliquota interna nossa ? 17%.
 * - Vc teria que fazer quantos seria a reducao 4,10% de 17%! Vc pega o 4,10 divide por 17 vezes 100 que da o valor de 24,12%.
 * - Ou seja 4.10 de 17 equivale a 24,12%.
 * - Se pegar os 1200x 4,10% daria 49,20
 * - Se pegar os 1200x 24,12% da o valor de 289,44x os 17% da o valor de 49,20!
 */
export function percentageReduction(reduction: number, aliquotICMS: number): number {
  return (reduction / aliquotICMS) * 100;
}

type baseReductionType = {
  id_regra: number;
  nome_regra: string;
  ncm: string;
  id_subcapitulo: number;
  nome_subcapitulo: string;
  aliquota: number;
  id_capitulo: number;
  nome_capitulo: string;
  valor: number;
  memoria: string;
};

export async function reductionValue(
  calcBaseNormalICMS: number,
  ICMSAliquot: number,
  movimentType: number,
  calcRule: number,
  UF: string,
  NCM: string,
  emissionDate: Date
): Promise<baseReductionType | null> {
  const result = {} as baseReductionType;
  let reductionAliquot = null;
  // eslint-disable-next-line no-debugger
  debugger;
  // Regra de calculo = 1, padrão de calculo e busca de informações compativel coma Convenio 52/91 do anexo V do ICMS MT
  if (calcRule === 1) {
    reductionAliquot = await getReductionAliquot(NCM, emissionDate, movimentType);

    if (reductionAliquot.length > 0) {
      const [firstReductionAliquot] = reductionAliquot;
      result.aliquota = firstReductionAliquot.aliquot;
      result.id_capitulo = firstReductionAliquot.idChapter;
      result.id_regra = firstReductionAliquot.idRule;
      result.id_subcapitulo = firstReductionAliquot.idSubchapter;
      result.nome_capitulo = firstReductionAliquot.nameChapter;
      result.nome_regra = firstReductionAliquot.nameRule;
      result.nome_subcapitulo = firstReductionAliquot.nameSubchapter;
      result.ncm = firstReductionAliquot.ncm;

      result.valor =
        (calcBaseNormalICMS * percentageReduction(firstReductionAliquot.aliquot, ICMSAliquot)) /
        100;
    }
  }

  result.memoria = `
Redução de Base de Cálculo
---------------------
(A) Base de Cálculo ICMS....: ${fShortenNumber(calcBaseNormalICMS)}
(B) Aliquota Externa ICMS...: ${fPercent(ICMSAliquot)}
(C) Aliquota de Redução.....: ${fPercent(result.aliquota)}
(D) % de Redução............: ${fPercent(percentageReduction(result.aliquota, ICMSAliquot))}
(E) Base Cálculo (A*D)/100..: ${fCurrency(result.valor)}
`;

  return result;
}

type aliquotReductionType = {
  idRule: number;
  nameRule: string;
  ncm: string;
  idSubchapter: number;
  nameSubchapter: string;
  aliquot: number;
  idChapter: number;
  nameChapter: string;
  createdAt: number;
};

async function getReductionAliquot(
  ncm: string,
  emissionDate: Date,
  movimentType: number
): Promise<aliquotReductionType[]> {
  const { data } = await axios.get(`/api/reductionAliquot`);
  return data;
}
