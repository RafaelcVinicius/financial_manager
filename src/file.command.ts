import { Command, CommandRunner, Option } from 'nest-commander';
import * as fs from 'fs/promises';

const arquivos = [
  {
    path: './src/@core/__names__/domain/entities',
    name: '__name__.entity.ts',
    conteudo: `import { BadRequestException } from '@nestjs/common';\nimport { Entity } from '../../../@shared/domain/entity';\nimport { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';\nimport { __Name__Validator } from '../validations/__name__.validator';\n\nexport type __Name__EntityType = {\n  id?: string;\n  value: number;\n  created_at?: Date;\n  updated_at?: Date;\n  deleted_at?: Date;\n};\n\nexport class __Name__Entity extends Entity {\n  id: Uuid;\n  value: number;\n  created_at: Date;\n  updated_at: Date;\n  deleted_at: Date;\n\n  constructor(props: __Name__EntityType) {\n    super();\n\n    this.id = new Uuid(props.id);\n    this.value = props.value;\n    this.created_at = props.created_at;\n    this.updated_at = props.updated_at;\n    this.deleted_at = props.deleted_at;\n\n    this.validate();\n  }\n\n  static create(props: __Name__EntityType) {\n    return new this(props);\n  }\n\n  static mock() {\n    return new this({\n      value: 15000,\n      created_at: new Date(),\n      updated_at: new Date(),\n      deleted_at: null,\n    });\n  }\n\n  toJSON() {\n    return {\n      id: this.id.value,\n      value: this.value,\n      created_at: this.created_at,\n      updated_at: this.updated_at,\n    };\n  }\n\n  validate(fields?: string[]) {\n    return __Name__Validator.create().validate(this.notification, this, fields);\n  }\n\n  changeValue(value: number) {\n    if (!value) throw new BadRequestException();\n\n    this.value = value;\n    this.validate(['value']);\n  }\n\n}\n`,
    children: [
      {
        path: './src/@core/__names__/domain/__tests__',
        name: '__name__.entity.ts',
        conteudo: `import { BadRequestException } from '@nestjs/common';\nimport { Entity } from '../../../@shared/domain/entity';\nimport { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';\nimport { __Name__Validator } from '../validations/__name__.validator';\n\nexport type __Name__EntityType = {\n  id?: string;\n  value: number;\n  created_at?: Date;\n  updated_at?: Date;\n  deleted_at?: Date;\n};\n\nexport class __Name__Entity extends Entity {\n  id: Uuid;\n  value: number;\n  created_at: Date;\n  updated_at: Date;\n  deleted_at: Date;\n\n  constructor(props: __Name__EntityType) {\n    super();\n\n    this.id = new Uuid(props.id);\n    this.value = props.value;\n    this.created_at = props.created_at;\n    this.updated_at = props.updated_at;\n    this.deleted_at = props.deleted_at;\n\n    this.validate();\n  }\n\n  static create(props: __Name__EntityType) {\n    return new this(props);\n  }\n\n  static mock() {\n    return new this({\n      value: 15000,\n      created_at: new Date(),\n      updated_at: new Date(),\n      deleted_at: null,\n    });\n  }\n\n  toJSON() {\n    return {\n      id: this.id.value,\n      value: this.value,\n      created_at: this.created_at,\n      updated_at: this.updated_at,\n    };\n  }\n\n  validate(fields?: string[]) {\n    return __Name__Validator.create().validate(this.notification, this, fields);\n  }\n\n  changeValue(value: number) {\n    if (!value) throw new BadRequestException();\n\n    this.value = value;\n    this.validate(['value']);\n  }\n\n}\n`,
      },
    ],
  },
  {
    path: './src/@core/__names__/domain/validations',
    name: '__name__.validator.ts',
    conteudo: `import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';\nimport { __Name__Entity } from '../entities/__name__.entity';\nimport { ClassValidatorFields } from '../../../@shared/domain/validators/class-validator-fields';\nimport { Notification } from '../../../@shared/domain/validators/notification';\n\nexport class __Name__Rules {\n  @IsUUID('4', { groups: ['id'] })\n  @IsNotEmpty({ groups: ['id'] })\n  id: string;\n\n  @IsNumber()\n  @IsNotEmpty({ groups: ['value'] })\n  value: number;\n\n  constructor(entity: __Name__Entity) {\n    Object.assign(this, entity);\n\n    this.id = entity.id.value;\n  }\n}\n\nexport class __Name__Validator extends ClassValidatorFields {\n  validate(notification: Notification, data: any, fields: string[]): boolean {\n    const newFields = fields?.length ? fields : ['id', 'value'];\n\n    return super.validate(notification, new __Name__Rules(data), newFields);\n  }\n\n  static create() {\n    return new this();\n  }\n}\n\n\n\n`,
  },
  {
    path: './src/@core/__names__/domain/contracts',
    name: '__name__.interface.ts',
    conteudo: `import { ISearchableRepository } from '../../../@shared/domain/repository/repository-interface';\nimport { SearchParams } from '../../../@shared/domain/repository/search-params';\nimport { SearchResult } from '../../../@shared/domain/repository/search-result';\nimport { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';\nimport { __Name__Entity } from '../entities/__name__.entity';\n\nexport type __Name__Filter = string;\n\nexport class __Name__SearchParams extends SearchParams<__Name__Filter> {}\n\nexport class __Name__SearchResult extends SearchResult<__Name__Entity> {}\n\nexport interface I__Name__Repository\n  extends ISearchableRepository<\n    __Name__Entity,\n    Uuid,\n    __Name__Filter,\n    __Name__SearchParams,\n    __Name__SearchResult\n  > {}\n`,
  },
];

interface FileOptions {
  name: string;
  names: string;
}

@Command({ name: 'create-file', description: 'Cria um arquivo padrão' })
export class CreateFileCommand extends CommandRunner {
  async run(passedParam: string[], options?: FileOptions): Promise<void> {
    const name = options?.name || 'default';
    const names = options?.names || 'default';

    try {
      for (const element of arquivos) {
        await this.createFile(element, name, names);
      }
    } catch (err) {
      console.error(`Erro ao criar o arquivo ${name}:`, err);
    }
  }

  async createFile(element: any, name: string, names: string) {
    const path = `${element.path.replace('__names__', names)}`;

    await fs.mkdir(path, {
      recursive: true,
    });

    await fs.writeFile(
      `${path}/${element.name.replace('__name__', name)}`,
      element.conteudo
        .replaceAll(
          '__Name__',
          name[0].toUpperCase() + name.replace(name[0], '')
        )
        .replaceAll('__name__', name)
    );

    console.log(
      `Arquivo ${path}/${element.name.replace('__name__', name)} criado com sucesso!`
    );

    if (element.children && element.children.length > 0) {
      for (const children of element.children) {
        await this.createFile(children, name, names);
      }
    }
  }

  @Option({
    flags: '-n, --name [name]',
    description: 'Nome no singular',
  })
  parseName(val: string): string {
    return val;
  }

  @Option({
    flags: '-ns, --names [names]',
    description: 'Nome no pural',
  })
  parseContent(val: string): string {
    return val;
  }
}
