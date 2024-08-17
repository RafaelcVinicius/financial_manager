import { ValidateNested, validateSync } from 'class-validator';
import { SearchInput } from '../../../../@shared/application/search-input';
import { SortDirection } from '../../../../@shared/domain/repository/search-params';
import { StockFilter } from '../../../domain/contracts/stock.interface';

export class ListStockInput implements SearchInput<StockFilter> {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  @ValidateNested()
  filter?: StockFilter;
}

export class ValidateListStockInput {
  static validate(input: ListStockInput) {
    return validateSync(input);
  }
}
