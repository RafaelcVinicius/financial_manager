import { FinanceInMemoryRepository } from '../../../../infra/db/in-memory/finance-in-memory.repository';
import { StoreFinanceUseCase } from '../store-finance.use-case';

describe('StoreFinanceUseCase Unit Tests', () => {
  let useCase: StoreFinanceUseCase;
  let repository: FinanceInMemoryRepository;

  beforeEach(() => {
    repository = new FinanceInMemoryRepository();
    useCase = new StoreFinanceUseCase(repository);
  });

  it('should create a fiance', async () => {
    const spyInsert = jest.spyOn(repository, 'store');
    let output = await useCase.execute({ value: 321 });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id.value,
      value: 321,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
    });

    output = await useCase.execute({
      value: 852,
    });

    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id.value,
      value: 852,
      created_at: repository.items[1].created_at,
      updated_at: repository.items[1].updated_at,
    });
  });
});
