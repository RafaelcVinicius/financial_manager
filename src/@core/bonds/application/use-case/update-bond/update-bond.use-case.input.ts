import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  validateSync,
} from 'class-validator';

export type UpdateBondInputConstructorProps = {
  id: string;
  value?: number;
  description?: string;
};

export class UpdateBondInput {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsOptional()
  value?: number;

  constructor(props: UpdateBondInputConstructorProps) {
    if (!props) return;

    this.id = props.id;
    this.value = props.value;
  }
}

export class ValidateGetBondInput {
  static validate(input: UpdateBondInput) {
    return validateSync(input);
  }
}
