import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { IExampleRepository } from '../../../domain/contracts/example.interface';
import {
  ExampleOutput,
  ExampleOutputMapper,
} from '../../common/example.output';
import { GetExampleInput } from './get-example.use-case.input';
import { NotFoundError } from '../../../../@shared/domain/error/not-found.error';
import { ExampleEntity } from '../../../domain/entities/example.entity';

export class GetExampleUseCase
  implements IUseCase<GetExampleInput, ExampleOutput>
{
  constructor(private readonly _exampleRepo: IExampleRepository) {}

  async execute(input: GetExampleInput): Promise<ExampleOutput> {
    const entity = await this._exampleRepo.findById(new Uuid(input.id));

    if (!entity) throw new NotFoundError(input.id, ExampleEntity);

    return ExampleOutputMapper.toOutput(entity);
  }
}

export type StoreExampleOutput = ExampleOutput;
