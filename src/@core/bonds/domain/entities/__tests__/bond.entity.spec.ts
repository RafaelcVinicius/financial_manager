import { BondEntity } from '../bond.entity';

describe('Bond unit tests', () => {
  const entity = BondEntity.mock();

  it('Should create a new entity entity', () => {
    expect(entity).toBeDefined();
    expect(entity).toBeDefined();
    expect(entity.unit_price).toBeDefined();
    expect(entity.code).toBeDefined();
    expect(entity.quantity).toBeDefined();
    expect(entity.fee).toBeDefined();
  }, 30000);
});
