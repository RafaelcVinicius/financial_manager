import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../@shared/application/pagination-output';
import { IUseCase } from '../../../../@shared/application/use-case.interface';
import {
  ExampleSearchParams,
  ExampleSearchResult,
  IExampleRepository,
} from '../../../domain/contracts/example.interface';
import {
  ExampleOutput,
  ExampleOutputMapper,
} from '../../common/example.output';
import { ListExampleInput } from './list-example.use-case.input';

export class ListExampleUseCase
  implements IUseCase<ListExampleInput, ListExamplesOutput>
{
  constructor(private readonly _ExampleRepo: IExampleRepository) {}

  async execute(input: ListExampleInput): Promise<ListExamplesOutput> {
    const entities = await this._ExampleRepo.search(
      new ExampleSearchParams(input)
    );

    return this.toOutput(entities);
  }

  private async toOutput(
    searchResult: ExampleSearchResult
  ): Promise<ListExamplesOutput> {
    const { items: _items } = searchResult;

    const items = _items.map((i) => {
      return ExampleOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListExamplesOutput = PaginationOutput<ExampleOutput>;
