import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { FinanceEntity } from '../../../../domain/entities/finance.entity';
import FinanceModel from '../../../../infra/db/sequelize/models/finance.model';
import { FinanceRepository } from '../../../../infra/db/sequelize/repositories/finance.repository';
import { ListFinanceUseCase } from '../list-finance.use-case';

describe('ListFinanceUseCase Unit Tests', () => {
  let useCase: ListFinanceUseCase;
  let repository: FinanceRepository;
  let financeEntity: FinanceEntity;

  const setup = setupSequelize({ models: [FinanceModel] });

  beforeEach(() => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);

    repository = new FinanceRepository(uow, FinanceModel);
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
