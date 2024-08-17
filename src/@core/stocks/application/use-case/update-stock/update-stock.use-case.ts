import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { NotFoundError } from '../../../../@shared/domain/error/not-found.error';
import { ApplicationService } from '../../../../@shared/application/application.service';
import { StockOutput, StockOutputMapper } from '../../common/stock.output';
import { UpdateStockInput } from './update-stock.use-case.input';
import { IStockRepository } from '../../../domain/contracts/stock.interface';
import { StockEntity } from '../../../domain/entities/stock.entity';

export class UpdateStockUseCase
  implements IUseCase<UpdateStockInput, StockOutput>
{
  constructor(
    private readonly _appService: ApplicationService,
    private readonly _stockRepo: IStockRepository
  ) {}

  async execute(input: UpdateStockInput): Promise<StockOutput> {
    return await this._appService.run(async () => {
      const entity = await this._stockRepo.findById(new Uuid(input.id));

      if (!entity) throw new NotFoundError(input.id, StockEntity);

      input.code && entity.changeCode(input.code);
      input.quantity && entity.changeQuantity(input.quantity);
      input.unit_price && entity.changeUnitPrice(input.unit_price);

      await this._stockRepo.update(entity);

      return StockOutputMapper.toOutput(entity);
    });
  }
}

export type StoreStockOutput = StockOutput;
