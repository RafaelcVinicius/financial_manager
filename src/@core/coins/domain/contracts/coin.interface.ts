import { ISearchableRepository } from '../../../@shared/domain/repository/repository-interface';
import { SearchParams } from '../../../@shared/domain/repository/search-params';
import { SearchResult } from '../../../@shared/domain/repository/search-result';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { CoinEntity } from '../entities/coin.entity';

export type CoinFilter = string;

export class CoinSearchParams extends SearchParams<CoinFilter> {}

export class CoinSearchResult extends SearchResult<CoinEntity> {}

export interface ICoinRepository
  extends ISearchableRepository<
    CoinEntity,
    Uuid,
    CoinFilter,
    CoinSearchParams,
    CoinSearchResult
  > {}
