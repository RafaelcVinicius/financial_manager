import { NotFoundError } from '../../../../../@shared/domain/error/not-found.error';
import { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';
import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { StockEntity } from '../../../../domain/entities/stock.entity';
import StockModel from '../models/stock.model';
import { StockRepository } from './stock.repository';

describe('StockRepository Integration Test', () => {
  let repository: StockRepository;
  const setup = setupSequelize({ models: [StockModel] });

  beforeEach(async () => {
    repository = new StockRepository(
      new UnitOfWorkSequelize(setup.sequelize),
      StockModel
    );
  });

  it('should inserts a new entity', async () => {
    const Stock = StockEntity.mock();
    await repository.create(Stock);
    const stockCreated = await repository.findById(Stock.id);

    expect(stockCreated!.toJSON()).toStrictEqual({
      ...Stock.toJSON(),
      updated_at: stockCreated.updated_at,
    });
  });

  it('should finds a entity by id', async () => {
    let entityFound = await repository.findById(new Uuid());
    expect(entityFound).toBeNull();

    const entity = StockEntity.mock();
    await repository.create(entity);
    entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual({
      ...entityFound.toJSON(),
      updated_at: entity.updated_at,
    });
  });

  it('should return all Stocks', async () => {
    const entity = StockEntity.mock();
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
    const entity = StockEntity.mock();
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.id.value, StockEntity)
    );
  });

  it('should delete a entity', async () => {
    const entity = StockEntity.mock();
    await repository.create(entity);

    await repository.delete(entity.id);
    await expect(repository.findById(entity.id)).resolves.toBeNull();
  });
});
