import { ISearchableRepository } from '../../../@shared/domain/repository/repository-interface';
import { SearchParams } from '../../../@shared/domain/repository/search-params';
import { SearchResult } from '../../../@shared/domain/repository/search-result';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { StockEntity } from '../entities/stock.entity';

export type StockFilter = string;

export class StockSearchParams extends SearchParams<StockFilter> {}

export class StockSearchResult extends SearchResult<StockEntity> {}

export interface IStockRepository
  extends ISearchableRepository<
    StockEntity,
    Uuid,
    StockFilter,
    StockSearchParams,
    StockSearchResult
  > {}
