import { fCurrency } from './formatNumber';

type ICMSCalculationBasisType = {
  value: number;
  description: string;
};

export function ICMSCalculationBasis(
  totalProducts: number,
  freight: number,
  insurance: number,
  anotherExpenses: number,
  discount: number,
  IPI: number
): ICMSCalculationBasisType {
  const value = totalProducts + freight + insurance + anotherExpenses - discount + IPI;

  const description = `
Base de Cálculo ICMS
---------------------
(A) Valor Produto.....: ${fCurrency(totalProducts)}
(B) Frete.............: ${fCurrency(freight)}
(C) Seguro............: ${fCurrency(insurance)}
(C) Outras Despesas...: ${fCurrency(anotherExpenses)}
(C) Desconto..........: ${fCurrency(discount)}
(C) IPI...............: ${fCurrency(IPI)}
(D) Valor BC ICMS.....: ${fCurrency(value)}
`;

  return { value, description };
}
