import { CoinEntity } from '../../../../domain/entities/coin.entity';
import CoinModel from './coin.model';
import '../../../../../../types/number';

export class CoinModelMapper {
  static toModel(entity: CoinEntity) {
    return {
      id: entity.id.value,
      value: entity.value.toBigint(),
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
    };
  }

  static toEntity(model: CoinModel) {
    return new CoinEntity({
      id: model.id,
      value: parseFloat(model.value.toString()).toDecimal(),
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
    });
  }
}
