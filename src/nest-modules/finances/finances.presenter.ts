import { Transform } from '@nestjs/class-transformer';
import { PaginationOutput } from '../../@core/@shared/application/pagination-output';
import { FinanceOutput } from '../../@core/finances/application/common/finance.output';
import { CollectionPresenter } from '../shared-module/collection.presenter';

export class FinancePresenter {
  id: string;

  @Transform(({ value }: { value: number }) => Number(value))
  value: number;

  description: string;

  @Transform(({ value }: { value: Date }) => value?.toISOString())
  created_at: Date;
  @Transform(({ value }: { value: Date }) => value?.toISOString())
  updated_at: Date;
  @Transform(({ value }: { value: Date }) => value?.toISOString())
  deleted_at: Date;

  constructor(output: FinanceOutput) {
    Object.assign(this, {
      ...output,
    });
  }
}

export class FinancePresenterCollection extends CollectionPresenter {
  data: FinancePresenter[];

  constructor(output: PaginationOutput<FinanceOutput>) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((i) => new FinancePresenter(i));
  }
}
