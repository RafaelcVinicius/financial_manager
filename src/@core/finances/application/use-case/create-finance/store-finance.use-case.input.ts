import { IsNotEmpty, IsNumber, validateSync } from 'class-validator';

export type StoreFinanceInputConstructorProps = {
  value: number;
};

export class StoreFinanceInput {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  constructor(props: StoreFinanceInputConstructorProps) {
    if (!props) return;

    this.value = props.value;
  }
}

export class ValidateStoreFinanceInput {
  static validate(input: StoreFinanceInput) {
    return validateSync(input);
  }
}
