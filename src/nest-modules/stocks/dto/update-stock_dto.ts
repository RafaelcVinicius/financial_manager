import { OmitType } from '@nestjs/mapped-types';
import { UpdateStockInput } from '../../../@core/stocks/application/use-case/update-stock/update-stock.use-case.input';

export class UpdateStockDto extends OmitType(UpdateStockInput, [
  'id',
] as const) {}
