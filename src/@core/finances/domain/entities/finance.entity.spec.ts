import { FinanceEntity } from './finance.entity';

describe('Finance unit tests', () => {
  const finance = FinanceEntity.mock();

  it('Should create a new finance entity', () => {
    expect(finance).toBeDefined();
    expect(finance).toBeDefined();
    expect(finance.value).toBeDefined();
    expect(finance.description).toBeDefined();
  }, 30000);
});
