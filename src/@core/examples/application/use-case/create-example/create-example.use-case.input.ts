import { IsNotEmpty, IsNumber, validateSync } from 'class-validator';

export type CreateExampleInputConstructorProps = {
  value: number;
};

export class CreateExampleInput {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  constructor(props: CreateExampleInputConstructorProps) {
    if (!props) return;

    Object.assign(this, props);
  }
}

export class ValidateCreateExampleInput {
  static validate(input: CreateExampleInput) {
    return validateSync(input);
  }
}
