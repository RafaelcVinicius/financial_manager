import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { IFinanceRepository } from '../../../domain/contracts/finance.interface';
import {
  FinanceOutput,
  FinanceOutputMapper,
} from '../../common/finance.output';
import { NotFoundError } from '../../../../@shared/domain/error/not-found.error';
import { FinanceEntity } from '../../../domain/entities/finance.entity';
import { UpdateFinanceInput } from './update-finance.use-case.input';
import { ApplicationService } from '../../../../@shared/application/application.service';

export class UpdateFinanceUseCase
  implements IUseCase<UpdateFinanceInput, FinanceOutput>
{
  constructor(
    private readonly _appService: ApplicationService,
    private readonly _financeRepo: IFinanceRepository
  ) {}

  async execute(input: UpdateFinanceInput): Promise<FinanceOutput> {
    return await this._appService.run(async () => {
      const entity = await this._financeRepo.findById(new Uuid(input.id));

      if (!entity) throw new NotFoundError(input.id, FinanceEntity);

      entity.changeValue(input.value);

      await this._financeRepo.update(entity);

      return FinanceOutputMapper.toOutput(entity);
    });
  }
}

export type StoreFinanceOutput = FinanceOutput;
