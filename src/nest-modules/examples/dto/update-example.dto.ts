import { OmitType } from '@nestjs/mapped-types';
import { UpdateExampleInput } from '../../../@core/examples/application/use-case/update-example/update-example.use-case.input';

export class UpdateExampleDto extends OmitType(UpdateExampleInput, [
  'id',
] as const) {}
