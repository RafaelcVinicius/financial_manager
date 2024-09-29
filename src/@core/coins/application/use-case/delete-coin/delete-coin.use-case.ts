import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { ICoinRepository } from '../../../domain/contracts/coin.interface';
import { DeleteCoinInput } from './delete-coin.use-case.input';

export class DeleteCoinUseCase implements IUseCase<DeleteCoinInput, void> {
  constructor(private readonly _coinRepo: ICoinRepository) {}

  async execute(input: DeleteCoinInput): Promise<void> {
    await this._coinRepo.delete(new Uuid(input.id));
  }
}
