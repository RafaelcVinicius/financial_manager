import { ValidateNested, validateSync } from 'class-validator';
import { SearchInput } from '../../../../@shared/application/search-input';
import { SortDirection } from '../../../../@shared/domain/repository/search-params';
import { FinanceFilter } from '../../../domain/contracts/finance.interface';

export class ListFinanceInput implements SearchInput<FinanceFilter> {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  @ValidateNested()
  filter?: FinanceFilter;
}

export class ValidateListFinanceInput {
  static validate(input: ListFinanceInput) {
    return validateSync(input);
  }
}
