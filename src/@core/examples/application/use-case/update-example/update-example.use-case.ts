import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { IExampleRepository } from '../../../domain/contracts/example.interface';
import {
  ExampleOutput,
  ExampleOutputMapper,
} from '../../common/example.output';
import { NotFoundError } from '../../../../@shared/domain/error/not-found.error';
import { ExampleEntity } from '../../../domain/entities/example.entity';
import { UpdateExampleInput } from './update-example.use-case.input';
import { ApplicationService } from '../../../../@shared/application/application.service';

export class UpdateExampleUseCase
  implements IUseCase<UpdateExampleInput, ExampleOutput>
{
  constructor(
    private readonly _appService: ApplicationService,
    private readonly _exampleRepo: IExampleRepository
  ) {}

  async execute(input: UpdateExampleInput): Promise<ExampleOutput> {
    return await this._appService.run(async () => {
      const entity = await this._exampleRepo.findById(new Uuid(input.id));

      if (!entity) throw new NotFoundError(input.id, ExampleEntity);

      input.value && entity.changeValue(input.value);

      await this._exampleRepo.update(entity);

      return ExampleOutputMapper.toOutput(entity);
    });
  }
}

export type StoreExampleOutput = ExampleOutput;
