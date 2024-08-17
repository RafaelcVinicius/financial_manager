import { NotFoundError } from '../../../../../@shared/domain/error/not-found.error';
import { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';
import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';
import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import { FinanceEntity } from '../../../../domain/entities/finance.entity';
import FinanceModel from '../models/finance.model';
import { FinanceRepository } from './finance.repository';

describe('FinanceRepository Integration Test', () => {
  let repository: FinanceRepository;
  const setup = setupSequelize({ models: [FinanceModel] });

  beforeEach(async () => {
    repository = new FinanceRepository(
      new UnitOfWorkSequelize(setup.sequelize),
      FinanceModel
    );
  });

  it('should inserts a new entity', async () => {
    const finance = FinanceEntity.mock();
    await repository.create(finance);
    const financeCreated = await repository.findById(finance.id);
    expect(financeCreated!.toJSON()).toStrictEqual(finance.toJSON());
  });

  it('should finds a entity by id', async () => {
    let entityFound = await repository.findById(new Uuid());
    expect(entityFound).toBeNull();

    const entity = FinanceEntity.mock();
    await repository.create(entity);
    entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound!.toJSON());
  });

  it('should return all finances', async () => {
    const entity = FinanceEntity.mock();
    await repository.create(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  it('should throw error on update when a entity not found', async () => {
    const entity = FinanceEntity.mock();
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.id.value, FinanceEntity)
    );
  });

  it('should delete a entity', async () => {
    const entity = FinanceEntity.mock();
    await repository.create(entity);

    await repository.delete(entity.id);
    await expect(repository.findById(entity.id)).resolves.toBeNull();
  });
});
