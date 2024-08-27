import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { BondEntity } from '../../../../../domain/entities/bond.entity';
import BondModel from '../bond.model';
import { BondModelMapper } from '../bond.model.mapper';

describe('Bond model mapper tests', () => {
  setupSequelize({ models: [BondModel] });

  const Entity = BondEntity.mock();

  it('Should map to model', () => {
    const model = BondModel.build({
      ...Entity.toJSON(),
      value: Entity.value.toBigint(),
      deleted_at: undefined,
    });

    const entityMappedToModel = BondModelMapper.toModel(Entity);

    expect(model!.toJSON()).toMatchObject(entityMappedToModel);
  }, 30000);

  it('Should map to entity', () => {
    const model = BondModel.build({
      ...Entity.toJSON(),
      value: Entity.value.toBigint(),
    });

    const modelMappedToEntity = BondModelMapper.toEntity(model);

    expect(Entity.toJSON()).toMatchObject(modelMappedToEntity.toJSON());
  }, 30000);
});
