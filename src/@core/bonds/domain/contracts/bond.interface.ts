import { ISearchableRepository } from '../../../@shared/domain/repository/repository-interface';
import { SearchParams } from '../../../@shared/domain/repository/search-params';
import { SearchResult } from '../../../@shared/domain/repository/search-result';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { BondEntity } from '../entities/bond.entity';

export type BondFilter = string;

export class BondSearchParams extends SearchParams<BondFilter> {}

export class BondSearchResult extends SearchResult<BondEntity> {}

export interface IBondRepository
  extends ISearchableRepository<
    BondEntity,
    Uuid,
    BondFilter,
    BondSearchParams,
    BondSearchResult
  > {}
