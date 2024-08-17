import StockModel from '../models/stock.model';
import { NotFoundError } from '../../../../../@shared/domain/error/not-found.error';
import { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';
import { IUnitOfWork } from '../../../../../@shared/domain/repository/unit-of-work.interface';
import {
  IStockRepository,
  StockSearchParams,
  StockSearchResult,
} from '../../../../domain/contracts/stock.interface';
import { StockEntity } from '../../../../domain/entities/stock.entity';
import { StockModelMapper } from '../models/stock.model.mapper';
import { Op } from 'sequelize';

export class StockRepository implements IStockRepository {
  sortableFields: string[] = ['name', 'created_at'];

  constructor(
    private uow: IUnitOfWork,
    private model: typeof StockModel
  ) {}

  async create(entity: StockEntity): Promise<void> {
    const modelProps = StockModelMapper.toModel(entity);
    await this.model.create(modelProps, {
      transaction: this.uow.getTransaction(),
    });
  }

  async update(entity: StockEntity): Promise<void> {
    const modelProps = StockModelMapper.toModel(entity);
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

  async findById(entity_id: Uuid): Promise<StockEntity | null> {
    const model = await this.model.findByPk(entity_id.value);

    return model ? StockModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<StockEntity[]> {
    const models = await this.model.findAll();
    return models.map((model) => {
      return StockModelMapper.toEntity(model);
    });
  }

  async search(props: StockSearchParams): Promise<StockSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;
    const { rows: models, count } = await this.model.findAndCountAll({
      ...(props.filter && {
        where: { code: { [Op.like]: `%${props.filter}%` } },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: [[props.sort, props.sort_dir]] }
        : { order: [['created_at', 'desc']] }),
      offset,
      limit,
    });

    return new StockSearchResult({
      items: models.map((model) => {
        return StockModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  getEntity(): new (...args: any[]) => StockEntity {
    return StockEntity;
  }
}
