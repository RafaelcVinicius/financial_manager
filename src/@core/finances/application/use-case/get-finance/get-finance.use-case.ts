import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { IFinanceRepository } from '../../../domain/contracts/finance.interface';
import {
  FinanceOutput,
  FinanceOutputMapper,
} from '../../common/finance.output';
import { GetFinanceInput } from './get-finance.use-case.input';

export class GetFinanceUseCase
  implements IUseCase<GetFinanceInput, FinanceOutput>
{
  constructor(private readonly _financeRepo: IFinanceRepository) {}

  async execute(input: GetFinanceInput): Promise<FinanceOutput> {
    const entity = await this._financeRepo.findById(new Uuid(input.id));

    return FinanceOutputMapper.toOutput(entity);
  }
}

export type StoreFinanceOutput = FinanceOutput;
