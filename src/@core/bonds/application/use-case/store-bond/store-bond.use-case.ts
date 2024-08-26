import { ApplicationService } from '../../../../@shared/application/application.service';
import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { EntityValidationError } from '../../../../@shared/domain/validators/validation.error';
import { IBondRepository } from '../../../domain/contracts/bond.interface';
import { BondEntity } from '../../../domain/entities/bond.entity';
import {
  BondOutput,
  BondOutputMapper,
} from '../../common/bond.output';
import { StoreBondInput } from './store-bond.use-case.input';

export class StoreBondUseCase
  implements IUseCase<StoreBondInput, BondOutput>
{
  constructor(
    private readonly _appService: ApplicationService,
    private readonly _BondRepo: IBondRepository
  ) {}

  async execute(input: StoreBondInput): Promise<BondOutput> {
    return await this._appService.run(async () => {
      const entity = BondEntity.create(input);

      if (entity.notification.hasErrors()) {
        throw new EntityValidationError(entity.notification.toJSON());
      }

      await this._BondRepo.create(entity);

      return BondOutputMapper.toOutput(entity);
    });
  }
}

export type StoreBondOutput = BondOutput;
