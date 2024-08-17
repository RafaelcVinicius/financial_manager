import { ApplicationService } from '../../../../@shared/application/application.service';
import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { EntityValidationError } from '../../../../@shared/domain/validators/validation.error';
import { IStockRepository } from '../../../domain/contracts/stock.interface';
import { StockEntity } from '../../../domain/entities/stock.entity';
import { StockOutput, StockOutputMapper } from '../../common/stock.output';
import { StoreStockInput } from './stock-stock.use-case.input';

export class StoreStockUseCase
  implements IUseCase<StoreStockInput, StockOutput>
{
  constructor(
    private readonly _appService: ApplicationService,
    private readonly _stockRepo: IStockRepository
  ) {}

  async execute(input: StoreStockInput): Promise<StockOutput> {
    return await this._appService.run(async () => {
      const entity = StockEntity.create(input);

      if (entity.notification.hasErrors()) {
        throw new EntityValidationError(entity.notification.toJSON());
      }

      await this._stockRepo.create(entity);

      return StockOutputMapper.toOutput(entity);
    });
  }
}

export type StoreStockOutput = StockOutput;
