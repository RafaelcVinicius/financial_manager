import { SortDirection } from '../../../../@shared/domain/repository/search-params';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { InMemorySearchableRepository } from '../../../../@shared/infra/db/in-memory/in-memory.repository';
import {
  BondFilter,
  IBondRepository,
} from '../../../domain/contracts/bond.interface';
import { BondEntity } from '../../../domain/entities/bond.entity';

export class BondInMemoryRepository
  extends InMemorySearchableRepository<BondEntity, Uuid>
  implements IBondRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: BondEntity[],
    filter: BondFilter | null
  ): Promise<BondEntity[]> {
    if (!filter) {
      return items;
    }

    return items;
  }
  getEntity(): new (...args: any[]) => BondEntity {
    return BondEntity;
  }

  protected applySort(
    items: BondEntity[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, 'created_at', 'desc');
  }
}
