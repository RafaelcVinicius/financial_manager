import { BondEntity } from '../../../domain/entities/bond.entity';
import { BondOutputMapper } from './../bond.output';

describe('BondOutputMapper Unit Tests', () => {
  it('should convert a bond in output', () => {
    const entity = BondEntity.mock();
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = BondOutputMapper.toOutput(entity);

    expect(spyToJSON).toHaveBeenCalled();

    expect(output).toStrictEqual({
      id: entity.id.value,
      unit_price: 1500,
      quantity: 0.5,
      code: 'LFT',
      fee: 0.15,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  });
});
