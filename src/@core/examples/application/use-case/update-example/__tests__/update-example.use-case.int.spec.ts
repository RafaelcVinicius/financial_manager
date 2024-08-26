import EventEmitter2 from 'eventemitter2';
import { ApplicationService } from '../../../../../@shared/application/application.service';
import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { ExampleEntity } from '../../../../domain/entities/example.entity';
import ExampleModel from '../../../../infra/db/sequelize/models/example.model';
import { ExampleRepository } from '../../../../infra/db/sequelize/repositories/example.repository';
import { UpdateExampleUseCase } from '../update-example.use-case';
import { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';

describe('UpdateExampleUseCase Integration Tests', () => {
  let useCase: UpdateExampleUseCase;
  let repository: ExampleRepository;
  let entity: ExampleEntity;

  const setup = setupSequelize({ models: [ExampleModel] });

  beforeAll(async () => {
    const uow = new UnitOfWorkSequelize(setup.sequelize);
    const domainEvent = new DomainEventMediator(new EventEmitter2());
    const app = new ApplicationService(uow, domainEvent);

    repository = new ExampleRepository(uow, ExampleModel);
    useCase = new UpdateExampleUseCase(app, repository);
  });

  it('should update a example', async () => {
    entity = ExampleEntity.mock();
    await repository.create(entity);

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
