import EventEmitter2 from 'eventemitter2';
import { ApplicationService } from '../../../../../@shared/application/application.service';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';
import { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';
import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import ExampleModel from '../../../../infra/db/sequelize/models/example.model';
import { ExampleRepository } from '../../../../infra/db/sequelize/repositories/example.repository';
import { CreateExampleUseCase } from '../create-example.use-case';

describe('CreateExampleUseCase Integration Tests', () => {
  let useCase: CreateExampleUseCase;
  let repository: ExampleRepository;

  const setup = setupSequelize({ models: [ExampleModel] });

  beforeAll(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    repository = new ExampleRepository(uow, ExampleModel);
    useCase = new CreateExampleUseCase(app, repository);
  });

  it('should create a example', async () => {
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
