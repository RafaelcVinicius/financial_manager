import {
  FinanceSearchParams,
  FinanceSearchResult,
  IFinanceRepository,
} from '../../../../domain/contracts/finance.interface';
import { FinanceEntity } from '../../../../domain/entities/finance.entity';
import { FinanceModelMapper } from '../models/finance.model.mapper';
import FinanceModel from '../models/finance.model';
import { NotFoundError } from '../../../../../@shared/domain/error/not-found.error';
import { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';
import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';

export class FinanceRepository implements IFinanceRepository {
  sortableFields: string[] = ['name', 'created_at'];

  constructor(
    private uow: UnitOfWorkSequelize,
    private model: typeof FinanceModel
  ) {}

  async create(entity: FinanceEntity): Promise<void> {
    const modelProps = FinanceModelMapper.toModel(entity);
    await this.model.create(modelProps);
  }

  async update(entity: FinanceEntity): Promise<void> {
    const modelProps = FinanceModelMapper.toModel(entity);
    const [affectedRows] = await this.model.update(modelProps, {
      where: { id: entity.id.value },
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(entity.id.value, this.getEntity());
    }
  }

  async delete(entity_id: Uuid): Promise<void> {
    const affectedRows = await this.model.destroy({
      where: { id: entity_id.value },
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(entity_id, this.getEntity());
    }
  }

  async findById(entity_id: Uuid): Promise<FinanceEntity | null> {
    const model = await this.model.findByPk(entity_id.value);

    return model ? FinanceModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<FinanceEntity[]> {
    const models = await this.model.findAll();
    return models.map((model) => {
      return FinanceModelMapper.toEntity(model);
    });
  }

  async search(props: FinanceSearchParams): Promise<FinanceSearchResult> {
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

    return new FinanceSearchResult({
      items: models.map((model) => {
        return FinanceModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  getEntity(): new (...args: any[]) => FinanceEntity {
    return FinanceEntity;
  }
}
