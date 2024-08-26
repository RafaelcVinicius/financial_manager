import { NotFoundError } from '../../../../../../@shared/domain/error/not-found.error';
import { Uuid } from '../../../../../../@shared/domain/value-objects/uuid.vo';
import { UnitOfWorkSequelize } from '../../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { ExampleEntity } from '../../../../../domain/entities/example.entity';
import ExampleModel from '../../models/example.model';
import { ExampleRepository } from '../example.repository';

describe('ExampleRepository Integration Test', () => {
  let repository: ExampleRepository;
  const setup = setupSequelize({ models: [ExampleModel] });

  beforeAll(async () => {
    repository = new ExampleRepository(
      new UnitOfWorkSequelize(setup.sequelize),
      ExampleModel
    );
  });

  it('should inserts a new entity', async () => {
    const example = ExampleEntity.mock();
    await repository.create(example);
    const exampleCreated = await repository.findById(example.id);
    expect(exampleCreated!.toJSON()).toStrictEqual({
      ...example.toJSON(),
      updated_at: exampleCreated.updated_at,
    });
  });

  it('should finds a entity by id', async () => {
    let entityFound = await repository.findById(new Uuid());
    expect(entityFound).toBeNull();

    const entity = ExampleEntity.mock();
    await repository.create(entity);
    entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual({
      ...entityFound!.toJSON(),
      updated_at: entity.updated_at,
    });
  });

  it('should return all examples', async () => {
    const entity = ExampleEntity.mock();
    await repository.create(entity);
    const entities = await repository.findAll();

    expect(entities).toHaveLength(1);
    expect(JSON.stringify([entities[0].toJSON()])).toBe(
      JSON.stringify([
        { ...entity.toJSON(), updated_at: entities[0].updated_at },
      ])
    );
  });

  it('should throw error on update when a entity not found', async () => {
    const entity = ExampleEntity.mock();
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.id.value, ExampleEntity)
    );
  });

  it('should delete a entity', async () => {
    const entity = ExampleEntity.mock();
    await repository.create(entity);

    await repository.delete(entity.id);
    await expect(repository.findById(entity.id)).resolves.toBeNull();
  });
});
