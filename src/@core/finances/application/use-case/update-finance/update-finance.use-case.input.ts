import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  validateSync,
} from 'class-validator';

export type UpdateFinanceInputConstructorProps = {
  id: string;
  value?: number;
  description?: string;
};

export class UpdateFinanceInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsOptional()
  value?: number;

  @IsString()
  @MaxLength(255)
  @MinLength(3)
  @IsOptional()
  description?: string;

  constructor(props: UpdateFinanceInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
    this.value = props.value;
    this.description = props.description;
  }
}

export class ValidateGetFinanceInput {
  static validate(input: UpdateFinanceInput) {
    return validateSync(input);
  }
}
