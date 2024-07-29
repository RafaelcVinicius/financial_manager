import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { FinanceEntity } from './finance.entity';

describe('Finance unit tests', () => {
  const prop = {
    id: new Uuid().value,
    value: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  };

  const finance = FinanceEntity.create(prop);

  it('Should create a new finance entity', () => {
    expect(finance).toBeDefined();
    expect(finance.toJSON()).toMatchObject(prop);
  }, 30000);
});
