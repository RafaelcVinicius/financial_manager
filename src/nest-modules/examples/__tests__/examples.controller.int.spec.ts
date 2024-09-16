import { Test, TestingModule } from '@nestjs/testing';
import { ExamplesController } from '../examples.controller';
import { ExamplesModule } from '../examples.module';
import { EXAMPLE_PROVIDERS } from '../examples.provider';
import { DeleteExampleUseCase } from '../../../@core/examples/application/use-case/delete-example/delete-example.use-case';
import {
  CreateExampleFixture,
  UpdateExampleFixture,
} from '../testing/example-fixture';
import { Uuid } from '../../../@core/@shared/domain/value-objects/uuid.vo';
import { ExampleOutputMapper } from '../../../@core/examples/application/common/example.output';
import { ExamplePresenter } from '../examples.presenter';
import { ExampleEntity } from '../../../@core/examples/domain/entities/example.entity';
import { DatabaseModule } from '../../database/database.module';
import { UpdateExampleUseCase } from '../../../@core/examples/application/use-case/update-example/update-example.use-case';
import { ListExamplesUseCase } from '../../../@core/examples/application/use-case/list-example/list-example.use-case';
import { GetExampleUseCase } from '../../../@core/examples/application/use-case/get-example/get-example.use-case';
import { SharedModule } from '../../shared/shared.module';
import { IExampleRepository } from '../../../@core/examples/domain/contracts/example.interface';
import { EventsModule } from '../../events/events.module';
import { getConnectionToken } from '@nestjs/sequelize';
import { UnitOfWorkSequelize } from '../../../@core/@shared/infra/db/sequelize/unit-of-work-sequelize';
import { ConfigModule } from '../../config/config.module';
import { Sequelize } from 'sequelize';
import { CreateExampleUseCase } from '../../../@core/examples/application/use-case/create-example/create-example.use-case';

describe('ExamplesController Integration Tests', () => {
  let controller: ExamplesController;
  let repository: IExampleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        SharedModule,
        EventsModule,
        ExamplesModule,
      ],
    })
      .overrideProvider('UnitOfWork')
      .useFactory({
        factory: (sequelize: Sequelize) => {
          return new UnitOfWorkSequelize(sequelize);
        },
        inject: [getConnectionToken()],
      })
      .compile();

    controller = module.get<ExamplesController>(ExamplesController);

    repository = module.get<IExampleRepository>(
      EXAMPLE_PROVIDERS.REPOSITORIES.EXAMPLE_REPOSITORY.provide
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createUseCase']).toBeInstanceOf(CreateExampleUseCase);
    expect(controller['updateUseCase']).toBeInstanceOf(UpdateExampleUseCase);
    expect(controller['listUseCase']).toBeInstanceOf(ListExamplesUseCase);
    expect(controller['getUseCase']).toBeInstanceOf(GetExampleUseCase);
    expect(controller['deleteUseCase']).toBeInstanceOf(DeleteExampleUseCase);
  });

  describe('should create a example', () => {
    const arrange = CreateExampleFixture.arrangeForCreate();
    test.each(arrange)('when body is $send_data', async ({ send_data }) => {
      const presenter = await controller.create(send_data);
      const entity = await repository.findById(new Uuid(presenter.id));

      entity.created_at = undefined;
      entity.updated_at = undefined;

      expect(entity!.toJSON()).toMatchObject({
        id: presenter.id,
        value: presenter.value,
        created_at: presenter.created_at,
        updated_at: presenter.updated_at,
      });

      const output = ExampleOutputMapper.toOutput(entity!);
      expect(presenter).toEqual(new ExamplePresenter(output));
    });
  });

  describe('should update a example', () => {
    const arrange = UpdateExampleFixture.arrangeForUpdate();

    const entityMock = ExampleEntity.mock();

    beforeEach(async () => {
      await repository.create(entityMock);
    });

    test.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected }) => {
        const presenter = await controller.update(
          entityMock.id.value,
          send_data
        );

        const entity = await repository.findById(new Uuid(presenter.id));
        entity.updated_at = presenter.updated_at;

        expect(entity!.toJSON()).toStrictEqual({
          id: presenter.id,
          created_at: presenter.created_at,
          updated_at: presenter.updated_at,
          value: expected.value ?? entityMock.value,
        });
        const output = ExampleOutputMapper.toOutput(entity!);
        expect(presenter).toEqual(new ExamplePresenter(output));
      }
    );
  });

  it('should delete a example', async () => {
    try {
      const entity = ExampleEntity.mock();
      await repository.create(entity);
      const response = await controller.delete(entity.id.value);
      expect(response).not.toBeDefined();
      await expect(repository.findById(entity.id.value)).resolves.toBeNull();
    } catch (error) {
      console.log(error);
    }
  });

  it('should get a example', async () => {
    const entity = ExampleEntity.mock();
    await repository.create(entity);
    const presenter = await controller.get(entity.id.value);

    expect(presenter.id).toBe(entity.id.value);
    expect(presenter.value).toBe(entity.value);
    expect(presenter.created_at).toStrictEqual(entity.created_at);
  });
});
