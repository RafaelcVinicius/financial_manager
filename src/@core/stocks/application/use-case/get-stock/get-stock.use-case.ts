import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { NotFoundError } from '../../../../@shared/domain/error/not-found.error';
import { GetStockInput } from './get-stock.use-case.input';
import { StockOutput, StockOutputMapper } from '../../common/stock.output';
import { IStockRepository } from '../../../domain/contracts/stock.interface';
import { StockEntity } from '../../../domain/entities/stock.entity';

export class GetStockUseCase implements IUseCase<GetStockInput, StockOutput> {
  constructor(private readonly _StockRepo: IStockRepository) {}

  async execute(input: GetStockInput): Promise<StockOutput> {
    const entity = await this._StockRepo.findById(new Uuid(input.id));

    if (!entity) throw new NotFoundError(input.id, StockEntity);

    return StockOutputMapper.toOutput(entity);
  }
}

export type StoreStockOutput = StockOutput;
