import {
  CoinSearchParams,
  CoinSearchResult,
  ICoinRepository,
} from '../../../../domain/contracts/coin.interface';
import { CoinEntity } from '../../../../domain/entities/coin.entity';
import { CoinModelMapper } from '../models/coin.model.mapper';
import CoinModel from '../models/coin.model';
import { NotFoundError } from '../../../../../@shared/domain/error/not-found.error';
import { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';
import { IUnitOfWork } from '../../../../../@shared/domain/repository/unit-of-work.interface';

export class CoinRepository implements ICoinRepository {
  sortableFields: string[] = ['name', 'created_at'];

  constructor(
    private uow: IUnitOfWork,
    private model: typeof CoinModel
  ) {}

  async create(entity: CoinEntity): Promise<void> {
    const modelProps = CoinModelMapper.toModel(entity);
    await this.model.create(modelProps, {
      transaction: this.uow.getTransaction(),
    });
  }

  async update(entity: CoinEntity): Promise<void> {
    const modelProps = CoinModelMapper.toModel(entity);
    const [affectedRows] = await this.model.update(modelProps, {
      where: { id: entity.id.value },
      transaction: this.uow.getTransaction(),
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(entity.id.value, this.getEntity());
    }
  }

  async delete(entity_id: Uuid): Promise<void> {
    const affectedRows = await this.model.destroy({
      where: { id: entity_id.value },
      transaction: this.uow.getTransaction(),
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(entity_id, this.getEntity());
    }
  }

  async findById(entity_id: Uuid): Promise<CoinEntity | null> {
    const model = await this.model.findByPk(entity_id.value, {
      transaction: this.uow.getTransaction(),
    });

    return model ? CoinModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<CoinEntity[]> {
    const models = await this.model.findAll({
      transaction: this.uow.getTransaction(),
    });
    return models.map((model) => {
      return CoinModelMapper.toEntity(model);
    });
  }

  async search(props: CoinSearchParams): Promise<CoinSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;
    const { rows: models, count } = await this.model.findAndCountAll({
      ...(props.filter && {
        where: { value: props.filter },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: [[props.sort, props.sort_dir]] }
        : { order: [['created_at', 'desc']] }),
      offset,
      limit,
    });

    return new CoinSearchResult({
      items: models.map((model) => {
        return CoinModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  getEntity(): new (...args: any[]) => CoinEntity {
    return CoinEntity;
  }
}
