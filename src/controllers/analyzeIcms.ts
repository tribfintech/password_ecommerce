import {
  AliquotDifferentialOutput,
  AliquotDifferentialInput,
  AliquotDifferentialInputST
} from 'utils/aliquotDifferential';
import { reductionValue } from 'utils/BaseReduction';

import { calculateICMSBCST, calculateICMSST } from 'utils/ICMSST';

export async function start(startDate: Date, endDate: Date, company: object, movimentType: number) {
  const resp = await reductionValue(10, 12, movimentType, 1, 'MT', 'NCM', startDate);
  console.log(resp);
  console.log(resp?.memoria);

  const resp1 = AliquotDifferentialOutput(1200, 12, 4.7);
  console.log(resp1);
  console.log(resp1?.description);

  const resp2 = AliquotDifferentialInput(1200, 4.7, 12);
  console.log(resp2);
  console.log(resp2?.description);

  const resp3 = AliquotDifferentialInputST(1200, 4.7, 12);
  console.log(resp3);
  console.log(resp3?.description);

  const resp4 = calculateICMSBCST(1200, 10);
  console.log(resp4);
  console.log(resp4?.description);

  const resp5 = calculateICMSST(5200, 5000, 10, 4.7, 12, 12);
  console.log(resp5);
  console.log(resp5?.description);
}
