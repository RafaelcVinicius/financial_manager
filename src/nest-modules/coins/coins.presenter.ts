import { Transform } from '@nestjs/class-transformer';
import { PaginationOutput } from '../../@core/@shared/application/pagination-output';
import { CollectionPresenter } from '../shared/collection.presenter';
import { CoinOutput } from '../../@core/coins/application/common/coin.output';

export class CoinPresenter {
  id: string;

  @Transform(({ value }: { value: number }) => Number(value))
  value: string;

  @Transform(({ value }: { value: Date }) => value?.toISOString())
  created_at: Date;
  @Transform(({ value }: { value: Date }) => value?.toISOString())
  updated_at: Date;
  @Transform(({ value }: { value: Date }) => value?.toISOString())
  deleted_at: Date;

  constructor(output: CoinOutput) {
    Object.assign(this, {
      ...output,
    });
  }
}

export class CoinPresenterCollection extends CollectionPresenter {
  data: CoinPresenter[];

  constructor(output: PaginationOutput<CoinOutput>) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((i) => new CoinPresenter(i));
  }
}
