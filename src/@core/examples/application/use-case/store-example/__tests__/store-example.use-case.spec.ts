import EventEmitter2 from 'eventemitter2';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import { UnitOfWorkFakeInMemory } from '../../../../../@shared/infra/db/in-memory/fake-unit-of-work-in-memory';
import { ExampleInMemoryRepository } from '../../../../infra/db/in-memory/example-in-memory.repository';
import { StoreExampleUseCase } from '../store-example.use-case';
import { ApplicationService } from '../../../../../@shared/application/application.service';

describe('StoreExampleUseCase Unit Tests', () => {
  let useCase: StoreExampleUseCase;
  let repository: ExampleInMemoryRepository;

  beforeEach(() => {
    repository = new ExampleInMemoryRepository();
    const uow = new UnitOfWorkFakeInMemory();
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);
    useCase = new StoreExampleUseCase(app, repository);
  });

  it('should create a examples', async () => {
    const spyInsert = jest.spyOn(repository, 'create');
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
