import { ExampleEntity } from '../../../../domain/entities/example.entity';
import ExampleModel from './example.model';
import '../../../../../../types/number';

export class ExampleModelMapper {
  static toModel(entity: ExampleEntity) {
    return {
      id: entity.id.value,
      value: entity.value.toBigint(),
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
    };
  }

  static toEntity(model: ExampleModel) {
    return new ExampleEntity({
      id: model.id,
      value: parseFloat(model.value.toString()).toDecimal(),
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
    });
  }
}
