import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../@shared/application/pagination-output';
import { IUseCase } from '../../../../@shared/application/use-case.interface';
import {
  BondSearchParams,
  BondSearchResult,
  IBondRepository,
} from '../../../domain/contracts/bond.interface';
import { BondOutput, BondOutputMapper } from '../../common/bond.output';
import { ListBondInput } from './list-bond.use-case.input';

export class ListBondUseCase
  implements IUseCase<ListBondInput, ListBondsOutput>
{
  constructor(private readonly _BondRepo: IBondRepository) {}

  async execute(input: ListBondInput): Promise<ListBondsOutput> {
    const entities = await this._BondRepo.search(new BondSearchParams(input));

    return this.toOutput(entities);
  }

  private async toOutput(
    searchResult: BondSearchResult
  ): Promise<ListBondsOutput> {
    const { items: _items } = searchResult;

    const items = _items.map((i) => {
      return BondOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListBondsOutput = PaginationOutput<BondOutput>;
