import { ValidateNested, validateSync } from 'class-validator';
import { SearchInput } from '../../../../@shared/application/search-input';
import { SortDirection } from '../../../../@shared/domain/repository/search-params';
import { ExampleFilter } from '../../../domain/contracts/example.interface';

export class ListExampleInput implements SearchInput<ExampleFilter> {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  @ValidateNested()
  filter?: ExampleFilter;
}

export class ValidateListExampleInput {
  static validate(input: ListExampleInput) {
    return validateSync(input);
  }
}
