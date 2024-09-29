import { NotFoundError } from '../../../../../../@shared/domain/error/not-found.error';
import { Uuid } from '../../../../../../@shared/domain/value-objects/uuid.vo';
import { UnitOfWorkSequelize } from '../../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { CoinEntity } from '../../../../../domain/entities/coin.entity';
import CoinModel from '../../models/coin.model';
import { CoinRepository } from '../coin.repository';

describe('CoinRepository Integration Test', () => {
  let repository: CoinRepository;
  const setup = setupSequelize({ models: [CoinModel] });

  beforeAll(async () => {
    repository = new CoinRepository(
      new UnitOfWorkSequelize(setup.sequelize),
      CoinModel
    );
  });

  it('should inserts a new entity', async () => {
    const coin = CoinEntity.mock();
    await repository.create(coin);
    const coinCreated = await repository.findById(coin.id);
    expect(coinCreated!.toJSON()).toStrictEqual({
      ...coin.toJSON(),
      updated_at: coinCreated.updated_at,
    });
  });

  it('should finds a entity by id', async () => {
    let entityFound = await repository.findById(new Uuid());
    expect(entityFound).toBeNull();

    const entity = CoinEntity.mock();
    await repository.create(entity);
    entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual({
      ...entityFound!.toJSON(),
      updated_at: entity.updated_at,
    });
  });

  it('should return all coins', async () => {
    const entity = CoinEntity.mock();
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
    const entity = CoinEntity.mock();
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.id.value, CoinEntity)
    );
  });

  it('should delete a entity', async () => {
    const entity = CoinEntity.mock();
    await repository.create(entity);

    await repository.delete(entity.id);
    await expect(repository.findById(entity.id)).resolves.toBeNull();
  });
});
