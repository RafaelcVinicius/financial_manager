import { OmitType } from '@nestjs/mapped-types';
import { UpdateFinanceInput } from '../../../@core/finances/application/use-case/update-finance/update-finance.use-case.input';

export class UpdateFinanceDto extends OmitType(UpdateFinanceInput, [
  'id',
] as const) {}
