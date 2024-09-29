import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../@shared/application/pagination-output';
import { IUseCase } from '../../../../@shared/application/use-case.interface';
import {
  CoinSearchParams,
  CoinSearchResult,
  ICoinRepository,
} from '../../../domain/contracts/coin.interface';
import { CoinOutput, CoinOutputMapper } from '../../common/coin.output';
import { ListCoinsInput } from './list-coin.use-case.input';

export class ListCoinsUseCase
  implements IUseCase<ListCoinsInput, ListCoinsOutput>
{
  constructor(private readonly _coinRepo: ICoinRepository) {}

  async execute(input: ListCoinsInput): Promise<ListCoinsOutput> {
    const entities = await this._coinRepo.search(new CoinSearchParams(input));

    return this.toOutput(entities);
  }

  private async toOutput(
    searchResult: CoinSearchResult
  ): Promise<ListCoinsOutput> {
    const { items: _items } = searchResult;

    const items = _items.map((i) => {
      return CoinOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListCoinsOutput = PaginationOutput<CoinOutput>;
