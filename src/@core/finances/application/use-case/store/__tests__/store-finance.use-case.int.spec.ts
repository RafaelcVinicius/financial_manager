import { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import FinanceModel from '../../../../infra/db/sequelize/models/finance.model';
import { FinanceRepository } from '../../../../infra/db/sequelize/repositories/finance.repository';
import { StoreFinanceUseCase } from '../store-finance.use-case';

describe('StoreFinanceUseCase Integration Tests', () => {
  let useCase: StoreFinanceUseCase;
  let repository: FinanceRepository;

  setupSequelize({ models: [FinanceModel] });

  beforeEach(() => {
    repository = new FinanceRepository(FinanceModel);
    useCase = new StoreFinanceUseCase(repository);
  });

  it('should create a finance', async () => {
    let output = await useCase.execute({ value: 741 });
    let entity = await repository.findById(new Uuid(output.id));

    expect(output).toStrictEqual({
      id: entity!.id.value,
      value: 741,
      created_at: undefined,
      updated_at: undefined,
    });

    output = await useCase.execute({
      value: 789,
    });
    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity!.id.value,
      value: 789,
      created_at: undefined,
      updated_at: undefined,
    });

    output = await useCase.execute({
      value: 853,
    });
    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity!.id.value,
      value: 853,
      created_at: undefined,
      updated_at: undefined,
    });
  });
});
