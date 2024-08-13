import { ApplicationService } from '../../../../@shared/application/application.service';
import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { EntityValidationError } from '../../../../@shared/domain/validators/validation.error';
import { IFinanceRepository } from '../../../domain/contracts/finance.interface';
import { FinanceEntity } from '../../../domain/entities/finance.entity';
import {
  FinanceOutput,
  FinanceOutputMapper,
} from '../../common/finance.output';
import { StoreFinanceInput } from './store-finance.use-case.input';

export class StoreFinanceUseCase
  implements IUseCase<StoreFinanceInput, FinanceOutput>
{
  constructor(
    private readonly _appService: ApplicationService,
    private readonly _financeRepo: IFinanceRepository
  ) {}

  async execute(input: StoreFinanceInput): Promise<FinanceOutput> {
    return await this._appService.run(async () => {
      const entity = FinanceEntity.create(input);

      if (entity.notification.hasErrors()) {
        throw new EntityValidationError(entity.notification.toJSON());
      }

      await this._financeRepo.create(entity);

      return FinanceOutputMapper.toOutput(entity);
    });
  }
}

export type StoreFinanceOutput = FinanceOutput;
