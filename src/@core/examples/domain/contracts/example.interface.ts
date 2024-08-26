import { ISearchableRepository } from '../../../@shared/domain/repository/repository-interface';
import { SearchParams } from '../../../@shared/domain/repository/search-params';
import { SearchResult } from '../../../@shared/domain/repository/search-result';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { ExampleEntity } from '../entities/example.entity';

export type ExampleFilter = string;

export class ExampleSearchParams extends SearchParams<ExampleFilter> {}

export class ExampleSearchResult extends SearchResult<ExampleEntity> {}

export interface IExampleRepository
  extends ISearchableRepository<
    ExampleEntity,
    Uuid,
    ExampleFilter,
    ExampleSearchParams,
    ExampleSearchResult
  > {}
