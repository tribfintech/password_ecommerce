import { fCurrency, fPercent } from './formatNumber';

type calculateType = {
  value: number;
  description: string;
};

export function calculateICMSBCST(BCICMSValue: number, MVA: number): calculateType {
  const MVAValue = BCICMSValue * (MVA / 100);
  const value = BCICMSValue + MVAValue;
  const description = `
Base de Cálculo ICMS ST
--------------------------------
(A) Valor BC ICMS ST: ${fCurrency(BCICMSValue)}
* Caso o item seja redução
  a Base de Cálculo será reduzida.
--------------------------------
(B) MVA.....................: ${fCurrency(MVA)}
(C) Total...................: ${fCurrency(MVAValue)}
(D) B. Cálculo ICMS ST (A+C): ${fCurrency(value)}
`;

  return { value, description };
}

export function calculateICMSST(
  BCICMSSTValue: number,
  totalProducts: number,
  discount: number,
  percentICMS: number,
  percentInternalICMS: number,
  freight: number
): calculateType {
  const ICMSValue = BCICMSSTValue * (percentICMS / 100);
  const ICMS7Value = (totalProducts - discount) * (percentInternalICMS / 100);
  const value = ICMSValue - ICMS7Value - freight * (percentICMS / 100);
  const description = `
Valor ICMS ST 
-----------------------------------------
(A) B. Cálculo ICMS ST......: ${fCurrency(BCICMSSTValue)}
(B) Aliquota Interna ICMS...........: ${fPercent(percentInternalICMS)}
(C) Total (A*B) .........................: ${fCurrency(ICMSValue)}
-----------------------------------------
(D) Valor total de produtos..........: ${fCurrency(totalProducts)}
(E) Valor de desconto................: ${fCurrency(discount)}
(F) Aliquota ICMS....................: ${fPercent(percentICMS)}
(G) Total ((D-E)*F)..................: ${fCurrency(ICMS7Value)}
------------------------------------------
(H) Resultado (C-G)..................: ${fCurrency(ICMSValue - ICMS7Value)}
(I) Valor Frete......................: ${fCurrency(freight)}
(J) Valor aliquota ICMS..............: ${fPercent(percentICMS)}
(K) Valor ICMS ST (H-(I*J))..........: ${fCurrency(value)}

`;

  return { value, description };
}
