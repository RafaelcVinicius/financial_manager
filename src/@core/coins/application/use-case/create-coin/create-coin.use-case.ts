import { ApplicationService } from '../../../../@shared/application/application.service';
import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { EntityValidationError } from '../../../../@shared/domain/validators/validation.error';
import { ICoinRepository } from '../../../domain/contracts/coin.interface';
import { CoinEntity } from '../../../domain/entities/coin.entity';
import { CoinOutput, CoinOutputMapper } from '../../common/coin.output';
import { CreateCoinInput } from './create-coin.use-case.input';

export class CreateCoinUseCase
  implements IUseCase<CreateCoinInput, CoinOutput>
{
  constructor(
    private readonly _appService: ApplicationService,
    private readonly _coinRepo: ICoinRepository
  ) {}

  async execute(input: CreateCoinInput): Promise<CoinOutput> {
    return await this._appService.run(async () => {
      const entity = CoinEntity.create(input);

      if (entity.notification.hasErrors()) {
        throw new EntityValidationError(entity.notification.toJSON());
      }

      await this._coinRepo.create(entity);

      return CoinOutputMapper.toOutput(entity);
    });
  }
}

export type CreateCoinOutput = CoinOutput;
