import { ExampleEntity } from '../example.entity';

describe('Example unit tests', () => {
  const entity = ExampleEntity.mock();

  it('Should create a new entity entity', () => {
    expect(entity).toBeDefined();
    expect(entity).toBeDefined();
    expect(entity.value).toBeDefined();
  }, 30000);
});
