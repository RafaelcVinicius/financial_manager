import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { ICoinRepository } from '../../../domain/contracts/coin.interface';
import { CoinOutput, CoinOutputMapper } from '../../common/coin.output';
import { NotFoundError } from '../../../../@shared/domain/error/not-found.error';
import { CoinEntity } from '../../../domain/entities/coin.entity';
import { UpdateCoinInput } from './update-coin.use-case.input';
import { ApplicationService } from '../../../../@shared/application/application.service';

export class UpdateCoinUseCase
  implements IUseCase<UpdateCoinInput, CoinOutput>
{
  constructor(
    private readonly _appService: ApplicationService,
    private readonly _coinRepo: ICoinRepository
  ) {}

  async execute(input: UpdateCoinInput): Promise<CoinOutput> {
    return await this._appService.run(async () => {
      const entity = await this._coinRepo.findById(new Uuid(input.id));

      if (!entity) throw new NotFoundError(input.id, CoinEntity);

      input.value && entity.changeValue(input.value);

      await this._coinRepo.update(entity);

      return CoinOutputMapper.toOutput(entity);
    });
  }
}

export type StoreCoinOutput = CoinOutput;
