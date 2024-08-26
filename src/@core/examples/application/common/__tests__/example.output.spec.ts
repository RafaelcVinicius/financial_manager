import { ExampleEntity } from '../../../domain/entities/example.entity';
import { ExampleOutputMapper } from './../example.output';

describe('ExampleOutputMapper Unit Tests', () => {
  it('should convert a example in output', () => {
    const entity = ExampleEntity.mock();
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = ExampleOutputMapper.toOutput(entity);

    expect(spyToJSON).toHaveBeenCalled();

    expect(output).toStrictEqual({
      id: entity.id.value,
      value: 15000,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  });
});
