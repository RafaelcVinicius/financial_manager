import { StockEntity } from '../../../domain/entities/stock.entity';
import { StockInMemoryRepository } from './stock-in-memory.repository';

describe('StockInMemoryRepository', () => {
  let repository: StockInMemoryRepository;

  beforeEach(() => (repository = new StockInMemoryRepository()));
  it('should no filter items when filter object is null', async () => {
    const items = [StockEntity.mock()];
    const filterSpy = jest.spyOn(items, 'filter' as any);

    const itemsFiltered = await repository['applyFilter'](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });
});
