import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { ExampleEntity } from '../../../../../domain/entities/example.entity';
import ExampleModel from '../example.model';
import { ExampleModelMapper } from '../example.model.mapper';

describe('Example model mapper tests', () => {
  setupSequelize({ models: [ExampleModel] });

  const entiry = ExampleEntity.mock();

  it('Should map to model', () => {
    const model = ExampleModel.build({
      ...entiry.toJSON(),
      value: entiry.value.toBigint(),
      deleted_at: undefined,
    });

    const entityMappedToModel = ExampleModelMapper.toModel(entiry);

    expect(model!.toJSON()).toMatchObject(entityMappedToModel);
  }, 30000);

  it('Should map to entity', () => {
    const model = ExampleModel.build({
      ...entiry.toJSON(),
      value: entiry.value.toBigint(),
    });

    const modelMappedToEntity = ExampleModelMapper.toEntity(model);

    expect(entiry.toJSON()).toMatchObject(modelMappedToEntity.toJSON());
  }, 30000);
});
