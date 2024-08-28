import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { BondEntity } from '../../../../../domain/entities/bond.entity';
import BondModel from '../bond.model';
import { BondModelMapper } from '../bond.model.mapper';

describe('Bond model mapper tests', () => {
  setupSequelize({ models: [BondModel] });

  const entity = BondEntity.mock();

  it('Should map to model', () => {
    const model = BondModel.build({
      ...entity.toJSON(),
      unit_price: entity.unit_price.toBigint(),
      fee: entity.fee.toBigint(),
      deleted_at: undefined,
    });

    const entityMappedToModel = BondModelMapper.toModel(entity);

    expect(model!.toJSON()).toMatchObject(entityMappedToModel);
  }, 30000);

  it('Should map to entity', () => {
    const model = BondModel.build({
      ...entity.toJSON(),
      unit_price: entity.unit_price.toBigint(),
      fee: entity.fee.toBigint(),
    });

    const modelMappedToEntity = BondModelMapper.toEntity(model);

    expect(entity.toJSON()).toMatchObject(modelMappedToEntity.toJSON());
  }, 30000);
});
