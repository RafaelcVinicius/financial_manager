import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

export type StoreFinanceInputConstructorProps = {
  value: number;
  description: string;
};

export class StoreFinanceInput {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(props: StoreFinanceInputConstructorProps) {
    if (!props) return;

    Object.assign(this, props);
  }
}

export class ValidateStoreFinanceInput {
  static validate(input: StoreFinanceInput) {
    return validateSync(input);
  }
}
