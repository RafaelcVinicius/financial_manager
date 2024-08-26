import { ApplicationService } from '../../../../../@shared/application/application.service';
import { ExampleEntity } from '../../../../domain/entities/example.entity';
import { ExampleInMemoryRepository } from '../../../../infra/db/in-memory/example-in-memory.repository';
import { UpdateExampleUseCase } from '../update-example.use-case';
import { UnitOfWorkFakeInMemory } from '../../../../../@shared/infra/db/in-memory/fake-unit-of-work-in-memory';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import EventEmitter2 from 'eventemitter2';

describe('UpdateExampleUseCase Unit Tests', () => {
  let useCase: UpdateExampleUseCase;
  let repository: ExampleInMemoryRepository;
  let entity: ExampleEntity;

  beforeAll(async () => {
    repository = new ExampleInMemoryRepository();
    const uow = new UnitOfWorkFakeInMemory();
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    useCase = new UpdateExampleUseCase(app, repository);

    entity = ExampleEntity.mock();
    await repository.create(entity);
  });

  it('should update a example', async () => {
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
