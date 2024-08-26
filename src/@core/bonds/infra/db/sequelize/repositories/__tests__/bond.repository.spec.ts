import { NotFoundError } from '../../../../../../@shared/domain/error/not-found.error';
import { Uuid } from '../../../../../../@shared/domain/value-objects/uuid.vo';
import { UnitOfWorkSequelize } from '../../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { BondEntity } from '../../../../../domain/entities/bond.entity';
import BondModel from '../../models/bond.model';
import { BondRepository } from '../bond.repository';

describe('BondRepository Integration Test', () => {
  let repository: BondRepository;
  const setup = setupSequelize({ models: [BondModel] });

  beforeAll(async () => {
    repository = new BondRepository(
      new UnitOfWorkSequelize(setup.sequelize),
      BondModel
    );
  });

  it('should inserts a new entity', async () => {
    const bond = BondEntity.mock();
    await repository.create(bond);
    const bondCreated = await repository.findById(bond.id);
    expect(bondCreated!.toJSON()).toStrictEqual({
      ...bond.toJSON(),
      updated_at: bondCreated.updated_at,
    });
  });

  it('should finds a entity by id', async () => {
    let entityFound = await repository.findById(new Uuid());
    expect(entityFound).toBeNull();

    const entity = BondEntity.mock();
    await repository.create(entity);
    entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual({
      ...entityFound!.toJSON(),
      updated_at: entity.updated_at,
    });
  });

  it('should return all bonds', async () => {
    const entity = BondEntity.mock();
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
    const entity = BondEntity.mock();
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.id.value, BondEntity)
    );
  });

  it('should delete a entity', async () => {
    const entity = BondEntity.mock();
    await repository.create(entity);

    await repository.delete(entity.id);
    await expect(repository.findById(entity.id)).resolves.toBeNull();
  });
});
