import { SortDirection } from '../../../../@shared/domain/repository/search-params';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { InMemorySearchableRepository } from '../../../../@shared/infra/db/in-memory/in-memory.repository';
import {
  ExampleFilter,
  IExampleRepository,
} from '../../../domain/contracts/example.interface';
import { ExampleEntity } from '../../../domain/entities/example.entity';

export class ExampleInMemoryRepository
  extends InMemorySearchableRepository<ExampleEntity, Uuid>
  implements IExampleRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: ExampleEntity[],
    filter: ExampleFilter | null
  ): Promise<ExampleEntity[]> {
    if (!filter) {
      return items;
    }

    return items;
  }
  getEntity(): new (...args: any[]) => ExampleEntity {
    return ExampleEntity;
  }

  protected applySort(
    items: ExampleEntity[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, 'created_at', 'desc');
  }
}
