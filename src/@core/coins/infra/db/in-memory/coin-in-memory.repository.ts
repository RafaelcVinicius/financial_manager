import { SortDirection } from '../../../../@shared/domain/repository/search-params';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { InMemorySearchableRepository } from '../../../../@shared/infra/db/in-memory/in-memory.repository';
import {
  CoinFilter,
  ICoinRepository,
} from '../../../domain/contracts/coin.interface';
import { CoinEntity } from '../../../domain/entities/coin.entity';

export class CoinInMemoryRepository
  extends InMemorySearchableRepository<CoinEntity, Uuid>
  implements ICoinRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: CoinEntity[],
    filter: CoinFilter | null
  ): Promise<CoinEntity[]> {
    if (!filter) {
      return items;
    }

    return items;
  }
  getEntity(): new (...args: any[]) => CoinEntity {
    return CoinEntity;
  }

  protected applySort(
    items: CoinEntity[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, 'created_at', 'desc');
  }
}
