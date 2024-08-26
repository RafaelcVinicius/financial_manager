import { IsNotEmpty, IsNumber, validateSync } from 'class-validator';

export type StoreBondInputConstructorProps = {
  value: number;
};

export class StoreBondInput {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  constructor(props: StoreBondInputConstructorProps) {
    if (!props) return;

    this.value = props.value;
  }
}

export class ValidateStoreBondInput {
  static validate(input: StoreBondInput) {
    return validateSync(input);
  }
}
