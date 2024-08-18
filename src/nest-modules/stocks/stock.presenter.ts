import { Transform } from '@nestjs/class-transformer';
import { PaginationOutput } from '../../@core/@shared/application/pagination-output';
import { CollectionPresenter } from '../shared/collection.presenter';
import { StockOutput } from '../../@core/stocks/application/common/stock.output';

export class StockPresenter {
  id: string;
  code: string;

  @Transform(({ value }: { value: number }) => Number(value))
  quantity: number;

  @Transform(({ value }: { value: number }) => Number(value))
  unit_price: number;

  @Transform(({ value }: { value: Date }) => value?.toISOString())
  created_at: Date;
  @Transform(({ value }: { value: Date }) => value?.toISOString())
  updated_at: Date;
  @Transform(({ value }: { value: Date }) => value?.toISOString())
  deleted_at: Date;

  constructor(output: StockOutput) {
    Object.assign(this, {
      ...output,
    });
  }
}

export class StockPresenterCollection extends CollectionPresenter {
  data: StockPresenter[];

  constructor(output: PaginationOutput<StockOutput>) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((i) => new StockPresenter(i));
  }
}
