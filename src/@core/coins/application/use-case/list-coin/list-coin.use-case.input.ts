import { ValidateNested, validateSync } from 'class-validator';
import { SearchInput } from '../../../../@shared/application/search-input';
import { SortDirection } from '../../../../@shared/domain/repository/search-params';
import { CoinFilter } from '../../../domain/contracts/coin.interface';

export class ListCoinsInput implements SearchInput<CoinFilter> {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  @ValidateNested()
  filter?: CoinFilter;
}

export class ValidateListCoinsInput {
  static validate(input: ListCoinsInput) {
    return validateSync(input);
  }
}
