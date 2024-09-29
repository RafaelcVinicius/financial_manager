import { CoinEntity } from '../../../../domain/entities/coin.entity';
import { CoinInMemoryRepository } from '../coin-in-memory.repository';

describe('CoinInMemoryRepository', () => {
  let repository: CoinInMemoryRepository;

  beforeEach(() => (repository = new CoinInMemoryRepository()));
  it('should no filter items when filter object is null', async () => {
    const items = [CoinEntity.mock()];
    const filterSpy = jest.spyOn(items, 'filter' as any);

    const itemsFiltered = await repository['applyFilter'](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });
});
