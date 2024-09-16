import { Transform } from '@nestjs/class-transformer';
import { PaginationOutput } from '../../@core/@shared/application/pagination-output';
import { CollectionPresenter } from '../shared/collection.presenter';
import { ExampleOutput } from '../../@core/examples/application/common/example.output';

export class ExamplePresenter {
  id: string;

  @Transform(({ value }: { value: number }) => Number(value))
  value: string;

  @Transform(({ value }: { value: Date }) => value?.toISOString())
  created_at: Date;
  @Transform(({ value }: { value: Date }) => value?.toISOString())
  updated_at: Date;
  @Transform(({ value }: { value: Date }) => value?.toISOString())
  deleted_at: Date;

  constructor(output: ExampleOutput) {
    Object.assign(this, {
      ...output,
    });
  }
}

export class ExamplePresenterCollection extends CollectionPresenter {
  data: ExamplePresenter[];

  constructor(output: PaginationOutput<ExampleOutput>) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((i) => new ExamplePresenter(i));
  }
}
