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
import { ListExamplesInput } from './list-example.use-case.input';

export class ListExamplesUseCase
  implements IUseCase<ListExamplesInput, ListExamplesOutput>
{
  constructor(private readonly _exampleRepo: IExampleRepository) {}

  async execute(input: ListExamplesInput): Promise<ListExamplesOutput> {
    const entities = await this._exampleRepo.search(
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
