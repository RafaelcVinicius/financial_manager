import { FinanceEntity } from '../../../domain/entities/finance.entity';
import { FinanceInMemoryRepository } from './finance-in-memory.repository';

describe('FinanceInMemoryRepository', () => {
  let repository: FinanceInMemoryRepository;

  beforeEach(() => (repository = new FinanceInMemoryRepository()));
  it('should no filter items when filter object is null', async () => {
    const items = [FinanceEntity.mock()];
    const filterSpy = jest.spyOn(items, 'filter' as any);

    const itemsFiltered = await repository['applyFilter'](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });
});
