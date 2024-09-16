import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { IExampleRepository } from '../../../domain/contracts/example.interface';
import { DeleteExampleInput } from './delete-example.use-case.input';

export class DeleteExampleUseCase
  implements IUseCase<DeleteExampleInput, void>
{
  constructor(private readonly _exampleRepo: IExampleRepository) {}

  async execute(input: DeleteExampleInput): Promise<void> {
    await this._exampleRepo.delete(new Uuid(input.id));
  }
}
