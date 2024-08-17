import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { StockEntity } from '../../../../../domain/entities/stock.entity';
import StockModel from '../stock.model';
import { StockModelMapper } from '../stock.model.mapper';

describe('Stock model mapper tests', () => {
  setupSequelize();

  const stockEntiry = StockEntity.mock();

  it('Should map to model', () => {
    const model = StockModel.build(stockEntiry.toJSON());

    const stockEntiryMappedToModel = StockModelMapper.toModel(stockEntiry);

    expect(model!.toJSON()).toMatchObject(stockEntiryMappedToModel);
  }, 30000);

  it('Should map to entity', () => {
    const model = StockModel.build(stockEntiry.toJSON());

    const stockModelMappedToEntity = StockModelMapper.toEntity(model);

    expect(stockEntiry.toJSON()).toMatchObject(
      stockModelMappedToEntity.toJSON()
    );
  }, 30000);
});
