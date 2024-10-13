import { FinanceEntity } from '../../../../domain/entities/finance.entity';
import FinanceModel from './finance.model';
import '../../../../../../types/number';
import { CoinModelMapper } from '../../../../../coins/infra/db/sequelize/models/coin.model.mapper';

export class FinanceModelMapper {
  static toModel(entity: FinanceEntity) {
    return {
      id: entity.id.value,
      value: entity.value.toBigint(),
      description: entity.description,
      coin_id: entity.coin.id.value,
      origem: entity.origem,
      origem_id: entity.origem_id.value,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }

  static toEntity(model: FinanceModel) {
    return new FinanceEntity({
      id: model.id,
      value: parseFloat(model.value.toString()).toDecimal(),
      description: model.description,
      coin: CoinModelMapper.toEntity(model.coin),
      origem: model.origem,
      origem_id: model.origem_id,
      created_at: model.created_at,
      updated_at: model.updated_at,
    });
  }
}
