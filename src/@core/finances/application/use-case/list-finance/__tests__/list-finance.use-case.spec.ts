import { FinanceEntity } from '../../../../domain/entities/finance.entity';
import { FinanceInMemoryRepository } from '../../../../infra/db/in-memory/finance-in-memory.repository';
import { ListFinanceUseCase } from '../list-finance.use-case';

describe('ListFinanceUseCase Unit Tests', () => {
  let useCase: ListFinanceUseCase;
  let repository: FinanceInMemoryRepository;
  let financeEntity: FinanceEntity;

  beforeAll(() => {
    repository = new FinanceInMemoryRepository();
    useCase = new ListFinanceUseCase(repository);

    financeEntity = FinanceEntity.mock();
    repository.create(financeEntity);
  });

  it('should create a fiance', async () => {
    const spyInsert = jest.spyOn(repository, 'search');
    const output = await useCase.execute({});

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 1,
      items: [financeEntity.toJSON()],
    });
  });
});
