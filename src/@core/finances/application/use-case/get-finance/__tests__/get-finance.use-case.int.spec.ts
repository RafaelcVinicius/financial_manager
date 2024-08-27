import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { FinanceEntity } from '../../../../domain/entities/finance.entity';
import FinanceModel from '../../../../infra/db/sequelize/models/finance.model';
import { FinanceRepository } from '../../../../infra/db/sequelize/repositories/finance.repository';
import { GetFinanceUseCase } from '../get-finance.use-case';

describe('GetFinanceUseCase Integration Tests', () => {
  let useCase: GetFinanceUseCase;
  let repository: FinanceRepository;
  let financeEntity: FinanceEntity;

  const setup = setupSequelize({ models: [FinanceModel] });

  beforeEach(() => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);

    repository = new FinanceRepository(uow, FinanceModel);
    useCase = new GetFinanceUseCase(repository);

    financeEntity = FinanceEntity.mock();
    repository.create(financeEntity);
  });

  it('should create a finance', async () => {
    const output = await useCase.execute({ id: financeEntity.id.value });

    expect(output).toStrictEqual({
      ...financeEntity.toJSON(),
      updated_at: output.updated_at,
    });
  });
});
