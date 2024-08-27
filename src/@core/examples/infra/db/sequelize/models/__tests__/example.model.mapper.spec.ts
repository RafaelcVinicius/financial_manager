import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { ExampleEntity } from '../../../../../domain/entities/example.entity';
import ExampleModel from '../example.model';
import { ExampleModelMapper } from '../example.model.mapper';

describe('Example model mapper tests', () => {
  setupSequelize({ models: [ExampleModel] });

  const Entity = ExampleEntity.mock();

  it('Should map to model', () => {
    const model = ExampleModel.build({
      ...Entity.toJSON(),
      value: Entity.value.toBigint(),
      deleted_at: undefined,
    });

    const entityMappedToModel = ExampleModelMapper.toModel(Entity);

    expect(model!.toJSON()).toMatchObject(entityMappedToModel);
  }, 30000);

  it('Should map to entity', () => {
    const model = ExampleModel.build({
      ...Entity.toJSON(),
      value: Entity.value.toBigint(),
    });

    const modelMappedToEntity = ExampleModelMapper.toEntity(model);

    expect(Entity.toJSON()).toMatchObject(modelMappedToEntity.toJSON());
  }, 30000);
});
