import {
  BondSearchParams,
  BondSearchResult,
  IBondRepository,
} from '../../../../domain/contracts/bond.interface';
import { BondEntity } from '../../../../domain/entities/bond.entity';
import { BondModelMapper } from '../models/bond.model.mapper';
import BondModel from '../models/bond.model';
import { NotFoundError } from '../../../../../@shared/domain/error/not-found.error';
import { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';
import { IUnitOfWork } from '../../../../../@shared/domain/repository/unit-of-work.interface';

export class BondRepository implements IBondRepository {
  sortableFields: string[] = ['name', 'created_at'];

  constructor(
    private uow: IUnitOfWork,
    private model: typeof BondModel
  ) {}

  async create(entity: BondEntity): Promise<void> {
    const modelProps = BondModelMapper.toModel(entity);
    await this.model.create(modelProps, {
      transaction: this.uow.getTransaction(),
    });
  }

  async update(entity: BondEntity): Promise<void> {
    const modelProps = BondModelMapper.toModel(entity);
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

  async findById(entity_id: Uuid): Promise<BondEntity | null> {
    const model = await this.model.findByPk(entity_id.value, {
      transaction: this.uow.getTransaction(),
    });

    return model ? BondModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<BondEntity[]> {
    const models = await this.model.findAll({
      transaction: this.uow.getTransaction(),
    });
    return models.map((model) => {
      return BondModelMapper.toEntity(model);
    });
  }

  async search(props: BondSearchParams): Promise<BondSearchResult> {
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

    return new BondSearchResult({
      items: models.map((model) => {
        return BondModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  getEntity(): new (...args: any[]) => BondEntity {
    return BondEntity;
  }
}
