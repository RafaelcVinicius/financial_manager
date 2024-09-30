import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import CoinModel from '../coin.model';

describe('Coin model integration tests', () => {
  setupSequelize({ models: [CoinModel] });

  test('table name', () => {
    expect(CoinModel.tableName).toBe('coins');
  });

  it('Should test mapping', () => {
    const attributesMap = CoinModel.getAttributes();

    expect(attributesMap).toHaveProperty('id');
    expect(attributesMap).toHaveProperty('name');
    expect(attributesMap).toHaveProperty('code');
    expect(attributesMap).toHaveProperty('quantity');
    expect(attributesMap).toHaveProperty('unit_price');
    expect(attributesMap).toHaveProperty('created_at');
    expect(attributesMap).toHaveProperty('updated_at');
    expect(attributesMap).toHaveProperty('deleted_at');
  }, 30000);
});
