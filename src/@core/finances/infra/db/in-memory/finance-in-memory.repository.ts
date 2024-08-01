import { SortDirection } from '../../../../@shared/domain/repository/search-params';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { InMemorySearchableRepository } from '../../../../@shared/infra/db/in-memory/in-memory.repository';
import {
  FinanceFilter,
  IFinanceRepository,
} from '../../../domain/contracts/finance.interface';
import { FinanceEntity } from '../../../domain/entities/finance.entity';

export class FinanceInMemoryRepository
  extends InMemorySearchableRepository<FinanceEntity, Uuid>
  implements IFinanceRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: FinanceEntity[],
    filter: FinanceFilter | null
  ): Promise<FinanceEntity[]> {
    if (!filter) {
      return items;
    }

    return items;
  }
  getEntity(): new (...args: any[]) => FinanceEntity {
    return FinanceEntity;
  }

  protected applySort(
    items: FinanceEntity[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, 'created_at', 'desc');
  }
}
