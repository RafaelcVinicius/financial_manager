import { CoinEntity } from '../coin.entity';

describe('Coin unit tests', () => {
  const entity = CoinEntity.mock();

  it('Should create a new entity entity', () => {
    expect(entity).toBeDefined();
    expect(entity).toBeDefined();
    expect(entity.value).toBeDefined();
  }, 30000);
});
