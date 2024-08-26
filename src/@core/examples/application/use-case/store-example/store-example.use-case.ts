import { ApplicationService } from '../../../../@shared/application/application.service';
import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { EntityValidationError } from '../../../../@shared/domain/validators/validation.error';
import { IExampleRepository } from '../../../domain/contracts/example.interface';
import { ExampleEntity } from '../../../domain/entities/example.entity';
import {
  ExampleOutput,
  ExampleOutputMapper,
} from '../../common/example.output';
import { StoreExampleInput } from './store-example.use-case.input';

export class StoreExampleUseCase
  implements IUseCase<StoreExampleInput, ExampleOutput>
{
  constructor(
    private readonly _appService: ApplicationService,
    private readonly _ExampleRepo: IExampleRepository
  ) {}

  async execute(input: StoreExampleInput): Promise<ExampleOutput> {
    return await this._appService.run(async () => {
      const entity = ExampleEntity.create(input);

      if (entity.notification.hasErrors()) {
        throw new EntityValidationError(entity.notification.toJSON());
      }

      await this._ExampleRepo.create(entity);

      return ExampleOutputMapper.toOutput(entity);
    });
  }
}

export type StoreExampleOutput = ExampleOutput;
