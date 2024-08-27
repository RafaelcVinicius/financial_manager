import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import StockModel from '../stock.model';

describe('Stock model integration tests', () => {
  setupSequelize({ models: [StockModel] });

  test('table name', () => {
    expect(StockModel.tableName).toBe('stocks');
  });

  it('Should test mapping', () => {
    const attributesMap = StockModel.getAttributes();

    expect(attributesMap).toHaveProperty('id');
    expect(attributesMap).toHaveProperty('code');
    expect(attributesMap).toHaveProperty('quantity');
    expect(attributesMap).toHaveProperty('unit_price');
    expect(attributesMap).toHaveProperty('created_at');
    expect(attributesMap).toHaveProperty('updated_at');
    expect(attributesMap).toHaveProperty('deleted_at');
  }, 30000);
});
