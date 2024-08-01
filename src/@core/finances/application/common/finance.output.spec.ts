import { FinanceEntity } from '../../domain/entities/finance.entity';
import { FinanceOutputMapper } from './finance.output';

describe('FinanceOutputMapper Unit Tests', () => {
  it('should convert a finance in output', () => {
    const entity = FinanceEntity.mock();
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = FinanceOutputMapper.toOutput(entity);

    expect(spyToJSON).toHaveBeenCalled();

    expect(output).toStrictEqual({
      id: entity.id.value,
      value: 15000,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  });
});
