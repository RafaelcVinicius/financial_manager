import { ApplicationService } from '../../../../../@shared/application/application.service';
import { FinanceEntity } from '../../../../domain/entities/finance.entity';
import { FinanceInMemoryRepository } from '../../../../infra/db/in-memory/finance-in-memory.repository';
import { UpdateFinanceUseCase } from '../update-finance.use-case';
import { UnitOfWorkFakeInMemory } from '../../../../../@shared/infra/db/in-memory/fake-unit-of-work-in-memory';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import EventEmitter2 from 'eventemitter2';

describe('UpdateFinanceUseCase Unit Tests', () => {
  let useCase: UpdateFinanceUseCase;
  let repository: FinanceInMemoryRepository;
  let financeEntity: FinanceEntity;

  beforeAll(async () => {
    repository = new FinanceInMemoryRepository();
    const uow = new UnitOfWorkFakeInMemory();
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    useCase = new UpdateFinanceUseCase(app, repository);

    financeEntity = FinanceEntity.mock();
    await repository.create(financeEntity);
  });

  it('should update a fiance', async () => {
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
