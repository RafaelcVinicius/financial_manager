import { Transform } from '@nestjs/class-transformer';
import { PaginationOutput } from '../../@core/@shared/application/pagination-output';
import { CollectionPresenter } from '../shared/collection.presenter';
import { BondOutput } from '../../@core/bonds/application/common/bond.output';

export class BondPresenter {
  id: string;

  @Transform(({ value }: { value: number }) => Number(value))
  value: string;

  @Transform(({ value }: { value: Date }) => value?.toISOString())
  created_at: Date;
  @Transform(({ value }: { value: Date }) => value?.toISOString())
  updated_at: Date;
  @Transform(({ value }: { value: Date }) => value?.toISOString())
  deleted_at: Date;

  constructor(output: BondOutput) {
    Object.assign(this, {
      ...output,
    });
  }
}

export class BondPresenterCollection extends CollectionPresenter {
  data: BondPresenter[];

  constructor(output: PaginationOutput<BondOutput>) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((i) => new BondPresenter(i));
  }
}
