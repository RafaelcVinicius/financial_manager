import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { StockEntity } from '../../../../../domain/entities/stock.entity';
import StockModel from '../stock.model';
import { StockModelMapper } from '../stock.model.mapper';

describe('Stock model mapper tests', () => {
  setupSequelize({ models: [StockModel] });

  const stockEntity = StockEntity.mock();

  it('Should map to model', () => {
    const model = StockModel.build({
      ...stockEntity.toJSON(),
      unit_price: stockEntity.unit_price * 1000000,
    });

    const stockEntityMappedToModel = StockModelMapper.toModel(stockEntity);

    expect(model!.toJSON()).toMatchObject(stockEntityMappedToModel);
  }, 30000);

  it('Should map to entity', () => {
    const model = StockModel.build({
      ...stockEntity.toJSON(),
      unit_price: stockEntity.unit_price * 1000000,
    });

    const stockModelMappedToEntity = StockModelMapper.toEntity(model);

    expect(stockEntity.toJSON()).toMatchObject(
      stockModelMappedToEntity.toJSON()
    );
  }, 30000);
});
