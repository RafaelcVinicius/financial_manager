import { CoinEntity } from '../coin.entity';

describe('Coin unit tests', () => {
  const entity = CoinEntity.mock();

  it('Should create a new entity entity', () => {
    expect(entity).toBeDefined();
    expect(entity).toBeDefined();
    expect(entity.name).toBeDefined();
    expect(entity.code).toBeDefined();
    expect(entity.quantity).toBeDefined();
    expect(entity.unit_price).toBeDefined();
  }, 30000);
});
