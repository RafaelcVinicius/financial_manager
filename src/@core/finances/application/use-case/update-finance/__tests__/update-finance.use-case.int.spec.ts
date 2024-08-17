import EventEmitter2 from 'eventemitter2';
import { ApplicationService } from '../../../../../@shared/application/application.service';
import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { FinanceEntity } from '../../../../domain/entities/finance.entity';
import FinanceModel from '../../../../infra/db/sequelize/models/finance.model';
import { FinanceRepository } from '../../../../infra/db/sequelize/repositories/finance.repository';
import { UpdateFinanceUseCase } from '../update-finance.use-case';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';

describe('UpdateFinanceUseCase Integration Tests', () => {
  let useCase: UpdateFinanceUseCase;
  let repository: FinanceRepository;
  let financeEntity: FinanceEntity;

  const setup = setupSequelize({ models: [FinanceModel] });

  beforeEach(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    repository = new FinanceRepository(uow, FinanceModel);
    useCase = new UpdateFinanceUseCase(app, repository);

    financeEntity = FinanceEntity.mock();
    await repository.create(financeEntity);
  });

  it('should update a finance', async () => {
    await useCase.execute({
      id: financeEntity.id.value,
      value: 10,
    });

    const model = await repository.findById(financeEntity.id);

    expect(model!.toJSON()).toMatchObject({
      id: financeEntity.id.value,
      value: 10,
    });
  });
});
