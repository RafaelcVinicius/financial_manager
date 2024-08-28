import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { IBondRepository } from '../../../domain/contracts/bond.interface';
import { BondOutput, BondOutputMapper } from '../../common/bond.output';
import { NotFoundError } from '../../../../@shared/domain/error/not-found.error';
import { BondEntity } from '../../../domain/entities/bond.entity';
import { UpdateBondInput } from './update-bond.use-case.input';
import { ApplicationService } from '../../../../@shared/application/application.service';

export class UpdateBondUseCase
  implements IUseCase<UpdateBondInput, BondOutput>
{
  constructor(
    private readonly _appService: ApplicationService,
    private readonly _BondRepo: IBondRepository
  ) {}

  async execute(input: UpdateBondInput): Promise<BondOutput> {
    return await this._appService.run(async () => {
      const entity = await this._BondRepo.findById(new Uuid(input.id));

      if (!entity) throw new NotFoundError(input.id, BondEntity);

      input.unit_price && entity.changeUnitPrice(input.unit_price);

      await this._BondRepo.update(entity);

      return BondOutputMapper.toOutput(entity);
    });
  }
}

export type StoreBondOutput = BondOutput;
