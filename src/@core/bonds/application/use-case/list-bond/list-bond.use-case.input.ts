import { ValidateNested, validateSync } from 'class-validator';
import { SearchInput } from '../../../../@shared/application/search-input';
import { SortDirection } from '../../../../@shared/domain/repository/search-params';
import { BondFilter } from '../../../domain/contracts/bond.interface';

export class ListBondInput implements SearchInput<BondFilter> {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  @ValidateNested()
  filter?: BondFilter;
}

export class ValidateListBondInput {
  static validate(input: ListBondInput) {
    return validateSync(input);
  }
}
