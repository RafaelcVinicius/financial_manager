import { SortDirection } from '../../../../@shared/domain/repository/search-params';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { InMemorySearchableRepository } from '../../../../@shared/infra/db/in-memory/in-memory.repository';
import {
  IStockRepository,
  StockFilter,
} from '../../../domain/contracts/stock.interface';
import { StockEntity } from '../../../domain/entities/stock.entity';

export class StockInMemoryRepository
  extends InMemorySearchableRepository<StockEntity, Uuid>
  implements IStockRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: StockEntity[],
    filter: StockFilter | null
  ): Promise<StockEntity[]> {
    if (!filter) {
      return items;
    }

    return items;
  }
  getEntity(): new (...args: any[]) => StockEntity {
    return StockEntity;
  }

  protected applySort(
    items: StockEntity[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, 'created_at', 'desc');
  }
}
