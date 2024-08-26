import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import BondModel from '../bond.model';

describe('Bond model integration tests', () => {
  setupSequelize({ models: [BondModel] });

  test('table name', () => {
    expect(BondModel.tableName).toBe('bonds');
  });

  it('Should test mapping', () => {
    const attributesMap = BondModel.getAttributes();

    expect(attributesMap).toHaveProperty('id');
    expect(attributesMap).toHaveProperty('value');
    expect(attributesMap).toHaveProperty('created_at');
    expect(attributesMap).toHaveProperty('updated_at');
    expect(attributesMap).toHaveProperty('deleted_at');
  }, 30000);
});
