import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../@shared/application/pagination-output';
import { IUseCase } from '../../../../@shared/application/use-case.interface';
import {
  FinanceSearchParams,
  FinanceSearchResult,
  IFinanceRepository,
} from '../../../domain/contracts/finance.interface';
import {
  FinanceOutput,
  FinanceOutputMapper,
} from '../../common/finance.output';
import { ListFinanceInput } from './list-finance.use-case.input';

export class ListFinanceUseCase
  implements IUseCase<ListFinanceInput, ListFinancesOutput>
{
  constructor(private readonly _financeRepo: IFinanceRepository) {}

  async execute(input: ListFinanceInput): Promise<ListFinancesOutput> {
    const entities = await this._financeRepo.search(
      new FinanceSearchParams(input)
    );

    return this.toOutput(entities);
  }

  private async toOutput(
    searchResult: FinanceSearchResult
  ): Promise<ListFinancesOutput> {
    const { items: _items } = searchResult;

    const items = _items.map((i) => {
      return FinanceOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListFinancesOutput = PaginationOutput<FinanceOutput>;
