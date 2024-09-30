import { CoinEntity } from '../../../../domain/entities/coin.entity';
import CoinModel from './coin.model';
import '../../../../../../types/number';

export class CoinModelMapper {
  static toModel(entity: CoinEntity) {
    return {
      id: entity.id.value,
      name: entity.name,
      code: entity.code,
      quantity: entity.quantity,
      unit_price: entity.unit_price.toBigint(),
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
    };
  }

  static toEntity(model: CoinModel) {
    return new CoinEntity({
      id: model.id,
      name: model.name,
      code: model.code,
      quantity: parseFloat(model.quantity.toString()),
      unit_price: parseFloat(model.unit_price.toString()).toDecimal(),
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
    });
  }
}
