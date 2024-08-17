import { setupSequelize } from '../../../../../@shared/infra/testing/helpers';
import FinanceModel from './finance.model';

describe('Finances model integration tests', () => {
  setupSequelize();

  test('table name', () => {
    expect(FinanceModel.tableName).toBe('finances');
  });

  it('Should test mapping', () => {
    const attributesMap = FinanceModel.getAttributes();

    expect(attributesMap).toHaveProperty('id');
    expect(attributesMap).toHaveProperty('value');
    expect(attributesMap).toHaveProperty('created_at');
    expect(attributesMap).toHaveProperty('updated_at');
    expect(attributesMap).toHaveProperty('deleted_at');
  }, 30000);
});
