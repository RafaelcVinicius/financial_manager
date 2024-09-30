import { CoinEntity } from '../../../domain/entities/coin.entity';
import { CoinOutputMapper } from './../coin.output';

describe('CoinOutputMapper Unit Tests', () => {
  it('should convert a coin in output', () => {
    const entity = CoinEntity.mock();
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = CoinOutputMapper.toOutput(entity);

    expect(spyToJSON).toHaveBeenCalled();

    expect(output).toStrictEqual({
      id: entity.id.value,
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 0.12345612,
      unit_price: 90000,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  });
});
