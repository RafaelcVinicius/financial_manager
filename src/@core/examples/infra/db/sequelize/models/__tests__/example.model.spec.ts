import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import ExampleModel from '../example.model';

describe('Example model integration tests', () => {
  setupSequelize({ models: [ExampleModel] });

  test('table name', () => {
    expect(ExampleModel.tableName).toBe('examples');
  });

  it('Should test mapping', () => {
    const attributesMap = ExampleModel.getAttributes();

    expect(attributesMap).toHaveProperty('id');
    expect(attributesMap).toHaveProperty('value');
    expect(attributesMap).toHaveProperty('created_at');
    expect(attributesMap).toHaveProperty('updated_at');
    expect(attributesMap).toHaveProperty('deleted_at');
  }, 30000);
});
