import { BondEntity } from '../bond.entity';

describe('Bond unit tests', () => {
  const entity = BondEntity.mock();

  it('Should create a new entity entity', () => {
    expect(entity).toBeDefined();
    expect(entity).toBeDefined();
    expect(entity.value).toBeDefined();
  }, 30000);
});
