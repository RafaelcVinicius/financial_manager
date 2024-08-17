import { StockEntity } from '../../domain/entities/stock.entity';
import { StockOutputMapper } from './stock.output';

describe('StockOutputMapper Unit Tests', () => {
  it('should convert a Stock in output', () => {
    const entity = StockEntity.mock();
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = StockOutputMapper.toOutput(entity);

    expect(spyToJSON).toHaveBeenCalled();

    expect(output).toStrictEqual({
      id: entity.id.value,
      code: 'bbsa3',
      quantity: 5,
      unit_price: 23,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  });
});
