import { ISearchableRepository } from '../../../@shared/domain/repository/repository-interface';
import { SearchParams } from '../../../@shared/domain/repository/search-params';
import { SearchResult } from '../../../@shared/domain/repository/search-result';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { FinanceEntity } from '../entities/finance.entity';

export type FinanceFilter = string;

export class FinanceSearchParams extends SearchParams<FinanceFilter> {}

export class FinanceSearchResult extends SearchResult<FinanceEntity> {}

export interface IFinanceRepository
  extends ISearchableRepository<
    FinanceEntity,
    Uuid,
    FinanceFilter,
    FinanceSearchParams,
    FinanceSearchResult
  > {}
