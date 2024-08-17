import { StockEntity } from '../stock.entity';

describe('Stock unit tests', () => {
  const stock = StockEntity.mock();

  it('Should create a new Stock entity', () => {
    expect(stock).toBeDefined();
    expect(stock).toBeDefined();
    expect(stock.code).toBeDefined();
    expect(stock.quantity).toBeDefined();
    expect(stock.unit_price).toBeDefined();
  }, 30000);
});
