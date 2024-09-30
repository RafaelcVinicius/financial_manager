import { OmitType } from '@nestjs/mapped-types';
import { UpdateCoinInput } from '../../../@core/coins/application/use-case/update-coin/update-coin.use-case.input';

export class UpdateCoinDto extends OmitType(UpdateCoinInput, ['id'] as const) {}
