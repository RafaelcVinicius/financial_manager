import { IsNotEmpty, IsNumber, IsUUID, validateSync } from 'class-validator';

export type UpdateFinanceInputConstructorProps = {
  id: string;
  value: number;
};

export class UpdateFinanceInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  constructor(props: UpdateFinanceInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
    this.value = props.value;
  }
}

export class ValidateGetFinanceInput {
  static validate(input: UpdateFinanceInput) {
    return validateSync(input);
  }
}
