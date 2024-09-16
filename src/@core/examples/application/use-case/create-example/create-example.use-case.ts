import { ApplicationService } from '../../../../@shared/application/application.service';
import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { EntityValidationError } from '../../../../@shared/domain/validators/validation.error';
import { IExampleRepository } from '../../../domain/contracts/example.interface';
import { ExampleEntity } from '../../../domain/entities/example.entity';
import {
  ExampleOutput,
  ExampleOutputMapper,
} from '../../common/example.output';
import { CreateExampleInput } from './create-example.use-case.input';

export class CreateExampleUseCase
  implements IUseCase<CreateExampleInput, ExampleOutput>
{
  constructor(
    private readonly _appService: ApplicationService,
    private readonly _exampleRepo: IExampleRepository
  ) {}

  async execute(input: CreateExampleInput): Promise<ExampleOutput> {
    return await this._appService.run(async () => {
      const entity = ExampleEntity.create(input);

      if (entity.notification.hasErrors()) {
        throw new EntityValidationError(entity.notification.toJSON());
      }

      await this._exampleRepo.create(entity);

      return ExampleOutputMapper.toOutput(entity);
    });
  }
}

export type CreateExampleOutput = ExampleOutput;
