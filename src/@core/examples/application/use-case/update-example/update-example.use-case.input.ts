import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  validateSync,
} from 'class-validator';

export type UpdateExampleInputConstructorProps = {
  id: string;
  value?: number;
  description?: string;
};

export class UpdateExampleInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsOptional()
  value?: number;

  constructor(props: UpdateExampleInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
    this.value = props.value;
  }
}

export class ValidateGetExampleInput {
  static validate(input: UpdateExampleInput) {
    return validateSync(input);
  }
}
