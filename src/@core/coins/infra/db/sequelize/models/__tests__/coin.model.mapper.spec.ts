import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { CoinEntity } from '../../../../../domain/entities/coin.entity';
import CoinModel from '../coin.model';
import { CoinModelMapper } from '../coin.model.mapper';

describe('Coin model mapper tests', () => {
  setupSequelize({ models: [CoinModel] });

  const entity = CoinEntity.mock();

  it('Should map to model', () => {
    const model = CoinModel.build({
      ...entity.toJSON(),
      value: entity.value.toBigint(),
      deleted_at: undefined,
    });

    const entityMappedToModel = CoinModelMapper.toModel(entity);

    expect(model!.toJSON()).toMatchObject(entityMappedToModel);
  }, 30000);

  it('Should map to entity', () => {
    const model = CoinModel.build({
      ...entity.toJSON(),
      value: entity.value.toBigint(),
    });

    const modelMappedToentity = CoinModelMapper.toEntity(model);

    expect(entity.toJSON()).toMatchObject(modelMappedToentity.toJSON());
  }, 30000);
});
