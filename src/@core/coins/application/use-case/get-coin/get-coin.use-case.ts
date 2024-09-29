import { IUseCase } from '../../../../@shared/application/use-case.interface';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { ICoinRepository } from '../../../domain/contracts/coin.interface';
import { CoinOutput, CoinOutputMapper } from '../../common/coin.output';
import { GetCoinInput } from './get-coin.use-case.input';
import { NotFoundError } from '../../../../@shared/domain/error/not-found.error';
import { CoinEntity } from '../../../domain/entities/coin.entity';

export class GetCoinUseCase implements IUseCase<GetCoinInput, CoinOutput> {
  constructor(private readonly _coinRepo: ICoinRepository) {}

  async execute(input: GetCoinInput): Promise<CoinOutput> {
    const entity = await this._coinRepo.findById(new Uuid(input.id));

    if (!entity) throw new NotFoundError(input.id, CoinEntity);

    return CoinOutputMapper.toOutput(entity);
  }
}

export type StoreCoinOutput = CoinOutput;
