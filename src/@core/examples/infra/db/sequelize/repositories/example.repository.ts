import {
  ExampleSearchParams,
  ExampleSearchResult,
  IExampleRepository,
} from '../../../../domain/contracts/example.interface';
import { ExampleEntity } from '../../../../domain/entities/example.entity';
import { ExampleModelMapper } from '../models/example.model.mapper';
import ExampleModel from '../models/example.model';
import { NotFoundError } from '../../../../../@shared/domain/error/not-found.error';
import { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';
import { IUnitOfWork } from '../../../../../@shared/domain/repository/unit-of-work.interface';

export class ExampleRepository implements IExampleRepository {
  sortableFields: string[] = ['name', 'created_at'];

  constructor(
    private uow: IUnitOfWork,
    private model: typeof ExampleModel
  ) {}

  async create(entity: ExampleEntity): Promise<void> {
    const modelProps = ExampleModelMapper.toModel(entity);
    await this.model.create(modelProps, {
      transaction: this.uow.getTransaction(),
    });
  }

  async update(entity: ExampleEntity): Promise<void> {
    const modelProps = ExampleModelMapper.toModel(entity);
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

  async findById(entity_id: Uuid): Promise<ExampleEntity | null> {
    try {
      const model = await this.model.findByPk(entity_id.value, {
        transaction: this.uow.getTransaction(),
      });

      return model ? ExampleModelMapper.toEntity(model) : null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(): Promise<ExampleEntity[]> {
    const models = await this.model.findAll({
      transaction: this.uow.getTransaction(),
    });
    return models.map((model) => {
      return ExampleModelMapper.toEntity(model);
    });
  }

  async search(props: ExampleSearchParams): Promise<ExampleSearchResult> {
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

    return new ExampleSearchResult({
      items: models.map((model) => {
        return ExampleModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  getEntity(): new (...args: any[]) => ExampleEntity {
    return ExampleEntity;
  }
}
