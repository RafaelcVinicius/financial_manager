import { ExampleEntity } from '../../../../domain/entities/example.entity';
import { ExampleInMemoryRepository } from '../example-in-memory.repository';

describe('ExampleInMemoryRepository', () => {
  let repository: ExampleInMemoryRepository;

  beforeEach(() => (repository = new ExampleInMemoryRepository()));
  it('should no filter items when filter object is null', async () => {
    const items = [ExampleEntity.mock()];
    const filterSpy = jest.spyOn(items, 'filter' as any);

    const itemsFiltered = await repository['applyFilter'](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });
});
