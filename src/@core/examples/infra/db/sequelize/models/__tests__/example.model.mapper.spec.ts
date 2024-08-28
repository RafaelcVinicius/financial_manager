import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { ExampleEntity } from '../../../../../domain/entities/example.entity';
import ExampleModel from '../example.model';
import { ExampleModelMapper } from '../example.model.mapper';

describe('Example model mapper tests', () => {
  setupSequelize({ models: [ExampleModel] });

  const entity = ExampleEntity.mock();

  it('Should map to model', () => {
    const model = ExampleModel.build({
      ...entity.toJSON(),
      value: entity.value.toBigint(),
      deleted_at: undefined,
    });

    const entityMappedToModel = ExampleModelMapper.toModel(entity);

    expect(model!.toJSON()).toMatchObject(entityMappedToModel);
  }, 30000);

  it('Should map to entity', () => {
    const model = ExampleModel.build({
      ...entity.toJSON(),
      value: entity.value.toBigint(),
    });

    const modelMappedToentity = ExampleModelMapper.toEntity(model);

    expect(entity.toJSON()).toMatchObject(modelMappedToentity.toJSON());
  }, 30000);
});
