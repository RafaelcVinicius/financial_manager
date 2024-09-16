import { OmitType } from '@nestjs/mapped-types';
import { UpdateBondInput } from '../../../@core/bonds/application/use-case/update-bond/update-bond.use-case.input';

export class UpdateBondDto extends OmitType(UpdateBondInput, [
  'id',
] as const) {}
