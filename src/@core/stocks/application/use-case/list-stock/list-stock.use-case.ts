import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../@shared/application/pagination-output';
import { IUseCase } from '../../../../@shared/application/use-case.interface';
import {
  IStockRepository,
  StockSearchParams,
  StockSearchResult,
} from '../../../domain/contracts/stock.interface';
import { StockOutput, StockOutputMapper } from '../../common/stock.output';
import { ListStockInput } from './list-stock.use-case.input';

export class ListStockUseCase
  implements IUseCase<ListStockInput, ListStocksOutput>
{
  constructor(private readonly _StockRepo: IStockRepository) {}

  async execute(input: ListStockInput): Promise<ListStocksOutput> {
    const entities = await this._StockRepo.search(new StockSearchParams(input));

    return this.toOutput(entities);
  }

  private async toOutput(
    searchResult: StockSearchResult
  ): Promise<ListStocksOutput> {
    const { items: _items } = searchResult;

    const items = _items.map((i) => {
      return StockOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListStocksOutput = PaginationOutput<StockOutput>;
