import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  validateSync,
} from 'class-validator';

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
  @MaxLength(255)
  @MinLength(3)
  description: string;

  constructor(props: StoreFinanceInputConstructorProps) {
    if (!props) return;

    this.value = props.value;
    this.description = props.description;
  }
}

export class ValidateStoreFinanceInput {
  static validate(input: StoreFinanceInput) {
    return validateSync(input);
  }
}
