import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { IBondRepository } from '../../../domain/contracts/bond.interface';
import {
  BondOutput,
  BondOutputMapper,
} from '../../common/bond.output';
import { GetBondInput } from './get-bond.use-case.input';
import { NotFoundError } from '../../../../@shared/domain/error/not-found.error';
import { BondEntity } from '../../../domain/entities/bond.entity';

export class GetBondUseCase
  implements IUseCase<GetBondInput, BondOutput>
{
  constructor(private readonly _BondRepo: IBondRepository) {}

  async execute(input: GetBondInput): Promise<BondOutput> {
    const entity = await this._BondRepo.findById(new Uuid(input.id));

    if (!entity) throw new NotFoundError(input.id, BondEntity);

    return BondOutputMapper.toOutput(entity);
  }
}

export type StoreBondOutput = BondOutput;
