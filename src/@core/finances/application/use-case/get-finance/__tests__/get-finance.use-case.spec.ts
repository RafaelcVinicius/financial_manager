import { FinanceEntity } from '../../../../domain/entities/finance.entity';
import { FinanceInMemoryRepository } from '../../../../infra/db/in-memory/finance-in-memory.repository';
import { GetFinanceUseCase } from '../get-finance.use-case';

describe('GetFinanceUseCase Unit Tests', () => {
  let useCase: GetFinanceUseCase;
  let repository: FinanceInMemoryRepository;
  let financeEntity: FinanceEntity;

  beforeAll(() => {
    repository = new FinanceInMemoryRepository();
    useCase = new GetFinanceUseCase(repository);

    financeEntity = FinanceEntity.mock();
    repository.create(financeEntity);
  });

  it('should create a fiance', async () => {
    const spyInsert = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: financeEntity.id.value });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual(financeEntity.toJSON());
  });
});
