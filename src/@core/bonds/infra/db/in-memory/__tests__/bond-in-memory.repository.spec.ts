import { BondEntity } from '../../../../domain/entities/bond.entity';
import { BondInMemoryRepository } from '../bond-in-memory.repository';

describe('BondInMemoryRepository', () => {
  let repository: BondInMemoryRepository;

  beforeEach(() => (repository = new BondInMemoryRepository()));
  it('should no filter items when filter object is null', async () => {
    const items = [BondEntity.mock()];
    const filterSpy = jest.spyOn(items, 'filter' as any);

    const itemsFiltered = await repository['applyFilter'](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });
});
