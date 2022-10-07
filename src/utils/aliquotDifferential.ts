import { fCurrency, fPercent } from './formatNumber';

type AliquotDifferentialInputOutputType = {
  value: number;
  description: string;
};

export function AliquotDifferentialOutput(
  value: number,
  externalPercent: number,
  internalPercent: number
): AliquotDifferentialInputOutputType {
  const operationValue = value;
  externalPercent /= 100;
  internalPercent /= 100;

  value *= externalPercent - internalPercent;

  const description = `
Diferencial de Aliquota Saídas 
--------------------- 
(A) Valor da Operação ou Prestação.:  ${fCurrency(operationValue)}
(B) Aliquota Externa ICMS..........:  ${fPercent(externalPercent * 100)}
(C) Aliquota Interna ICMS..........:  ${fPercent(internalPercent * 100)}
(D) Valor ICMS DIFAL Saídas A*(B-C):  ${fCurrency(value)}
`;

  return { value, description };
}

export function AliquotDifferentialInput(
  value: number,
  externalPercent: number,
  internalPercent: number
): AliquotDifferentialInputOutputType {
  const operationValue = value;
  externalPercent /= 100;
  internalPercent /= 100;

  value *= internalPercent - externalPercent;

  const description = `
Diferencial de Aliquota Entradas 
--------------------- 
(A) Valor da Operação ou Prestação..:  ${fCurrency(operationValue)}
(B) Aliquota Interno ICMS...........:  ${fPercent(internalPercent * 100)}
(C) Aliquota Externo ICMS(4,7,12%)..:  ${fPercent(externalPercent * 100)}
(D) Valor ICMS DIFAL Entrada A*(B-C):  ${fCurrency(value)}
`;

  return { value, description };
}

export function AliquotDifferentialInputST(
  value: number,
  externalPercent: number,
  internalPercent: number
): AliquotDifferentialInputOutputType {
  const operationValue = value;
  externalPercent /= 100;
  internalPercent /= 100;
  value -= operationValue * externalPercent;

  const internalPercentST = 1 - internalPercent;
  const internalValueToProccess = (value / internalPercentST) * internalPercent;
  const externalValueToProccess = operationValue * externalPercent;
  value = internalValueToProccess - externalValueToProccess;

  const description = `
Diferencial de Aliquota Entrada ST
--------------------- 
(A) Valor da Operação ou Prestação..:  ${fCurrency(operationValue)}
(B) Aliquota Externo ICMS...........:  ${fPercent(externalPercent * 100)}
(C) Aliquota Interno ICMS...........:  ${fPercent(internalPercent * 100)}
(D) DIFAL ST{((A-B)/(1-C))*C}-(A*B).:  ${fCurrency(value)}
`;

  return { value, description };
}
