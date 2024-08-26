import { ApplicationService } from '../../../../../@shared/application/application.service';
import { BondEntity } from '../../../../domain/entities/bond.entity';
import { BondInMemoryRepository } from '../../../../infra/db/in-memory/bond-in-memory.repository';
import { UpdateBondUseCase } from '../update-bond.use-case';
import { UnitOfWorkFakeInMemory } from '../../../../../@shared/infra/db/in-memory/fake-unit-of-work-in-memory';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import EventEmitter2 from 'eventemitter2';

describe('UpdateBondUseCase Unit Tests', () => {
  let useCase: UpdateBondUseCase;
  let repository: BondInMemoryRepository;
  let entity: BondEntity;

  beforeAll(async () => {
    repository = new BondInMemoryRepository();
    const uow = new UnitOfWorkFakeInMemory();
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    useCase = new UpdateBondUseCase(app, repository);

    entity = BondEntity.mock();
    await repository.create(entity);
  });

  it('should update a bond', async () => {
    await useCase.execute({
      id: entity.id.value,
      value: 10,
    });

    const model = await repository.findById(entity.id);

    expect(model!.toJSON()).toMatchObject({
      id: entity.id.value,
      value: 10,
    });
  });
});
