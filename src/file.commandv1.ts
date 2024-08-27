import { Command, CommandRunner, Option } from 'nest-commander';
import * as fs from 'fs/promises';

const arquivos = [
  // application
  {
    path: './src/@core/__names__/application/common',
    name: '__name__.output.ts',
    conteudo: `import { __Name__Entity } from '../../domain/entities/__name__.entity';\n\nexport type __Name__Output = {\n  id: string;\n  value: number;\n  created_at: Date;\n  updated_at: Date;\n};\n\nexport class __Name__OutputMapper {\n  static toOutput(entity: __Name__Entity): __Name__Output {\n    return entity.toJSON();\n  }\n}\n`,
    children: [
      {
        path: './src/@core/__names__/application/common/__tests__',
        name: '__name__.output.spec.ts',
        conteudo: `import { __Name__Entity } from '../../../domain/entities/__name__.entity';\nimport { __Name__OutputMapper } from './../__name__.output';\n\ndescribe('__Name__OutputMapper Unit Tests', () => {\n  it('should convert a __name__ in output', () => {\n    const entity = __Name__Entity.mock();\n    const spyToJSON = jest.spyOn(entity, 'toJSON');\n    const output = __Name__OutputMapper.toOutput(entity);\n\n    expect(spyToJSON).toHaveBeenCalled();\n\n    expect(output).toStrictEqual({\n      id: entity.id.value,\n      value: 15000,\n      created_at: entity.created_at,\n      updated_at: entity.updated_at,\n    });\n  });\n});\n`,
      },
    ],
  },

  // application use-case

  // store
  {
    path: './src/@core/__names__/application/use-case/store-__name__',
    name: 'store-__name__.use-case.ts',
    conteudo: `import { ApplicationService } from '../../../../@shared/application/application.service';\nimport { IUseCase } from '../../../../@shared/application/use-case.interface';\nimport { EntityValidationError } from '../../../../@shared/domain/validators/validation.error';\nimport { I__Name__Repository } from '../../../domain/contracts/__name__.interface';\nimport { __Name__Entity } from '../../../domain/entities/__name__.entity';\nimport {\n  __Name__Output,\n  __Name__OutputMapper,\n} from '../../common/__name__.output';\nimport { Store__Name__Input } from './store-__name__.use-case.input';\n\nexport class Store__Name__UseCase\n  implements IUseCase<Store__Name__Input, __Name__Output>\n{\n  constructor(\n    private readonly _appService: ApplicationService,\n    private readonly ___Name__Repo: I__Name__Repository\n  ) {}\n\n  async execute(input: Store__Name__Input): Promise<__Name__Output> {\n    return await this._appService.run(async () => {\n      const entity = __Name__Entity.create(input);\n\n      if (entity.notification.hasErrors()) {\n        throw new EntityValidationError(entity.notification.toJSON());\n      }\n\n      await this.___Name__Repo.create(entity);\n\n      return __Name__OutputMapper.toOutput(entity);\n    });\n  }\n}\n\nexport type Store__Name__Output = __Name__Output;\n`,
    children: [
      {
        path: './src/@core/__names__/application/use-case/store-__name__/__tests__',
        name: 'store-__name__.use-case.spec.ts',
        conteudo: `import EventEmitter2 from 'eventemitter2';\nimport { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';\nimport { UnitOfWorkFakeInMemory } from '../../../../../@shared/infra/db/in-memory/fake-unit-of-work-in-memory';\nimport { __Name__InMemoryRepository } from '../../../../infra/db/in-memory/__name__-in-memory.repository';\nimport { Store__Name__UseCase } from '../store-__name__.use-case';\nimport { ApplicationService } from '../../../../../@shared/application/application.service';\n\ndescribe('Store__Name__UseCase Unit Tests', () => {\n  let useCase: Store__Name__UseCase;\n  let repository: __Name__InMemoryRepository;\n\n  beforeEach(() => {\n    repository = new __Name__InMemoryRepository();\n    const uow = new UnitOfWorkFakeInMemory();\n    const domainEvent = new DomainEventMediator(new EventEmitter2());\n    const app = new ApplicationService(uow, domainEvent);\n    useCase = new Store__Name__UseCase(app, repository);\n  });\n\n  it('should create a fiance', async () => {\n    const spyInsert = jest.spyOn(repository, 'create');\n    let output = await useCase.execute({ value: 321 });\n\n    expect(spyInsert).toHaveBeenCalledTimes(1);\n    expect(output).toStrictEqual({\n      id: repository.items[0].id.value,\n      value: 321,\n      created_at: repository.items[0].created_at,\n      updated_at: repository.items[0].updated_at,\n    });\n\n    output = await useCase.execute({\n      value: 852,\n    });\n\n    expect(spyInsert).toHaveBeenCalledTimes(2);\n    expect(output).toStrictEqual({\n      id: repository.items[1].id.value,\n      value: 852,\n      created_at: repository.items[1].created_at,\n      updated_at: repository.items[1].updated_at,\n    });\n  });\n});\n`,
      },
      {
        path: './src/@core/__names__/application/use-case/store-__name__/__tests__',
        name: 'store-__name__.use-case.int.spec.ts',
        conteudo: `import EventEmitter2 from 'eventemitter2';\nimport { ApplicationService } from '../../../../../@shared/application/application.service';\nimport { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';\nimport { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';\nimport { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';\nimport { setupSequelize } from '../../../../../@shared/infra/testing/helpers';\nimport __Name__Model from '../../../../infra/db/sequelize/models/__name__.model';\nimport { __Name__Repository } from '../../../../infra/db/sequelize/repositories/__name__.repository';\nimport { Store__Name__UseCase } from '../store-__name__.use-case';\n\ndescribe('Store__Name__UseCase Integration Tests', () => {\n  let useCase: Store__Name__UseCase;\n  let repository: __Name__Repository;\n\n  const setup = setupSequelize({ models: [__Name__Model] });\n\n  beforeAll(() => {\n    const uow = new UnitOfWorkSequelize(setup.sequelize);\n    const domainEvent = new DomainEventMediator(new EventEmitter2());\n    const app = new ApplicationService(uow, domainEvent);\n\n    repository = new __Name__Repository(uow, __Name__Model);\n    useCase = new Store__Name__UseCase(app, repository);\n  });\n\n  it('should create a __name__', async () => {\n    let output = await useCase.execute({ value: 741 });\n    let entity = await repository.findById(new Uuid(output.id));\n\n    expect(output).toStrictEqual({\n      id: entity!.id.value,\n      value: 741,\n      created_at: undefined,\n      updated_at: undefined,\n    });\n\n    output = await useCase.execute({\n      value: 789,\n    });\n    entity = await repository.findById(new Uuid(output.id));\n    expect(output).toStrictEqual({\n      id: entity!.id.value,\n      value: 789,\n      created_at: undefined,\n      updated_at: undefined,\n    });\n\n    output = await useCase.execute({\n      value: 853,\n    });\n    entity = await repository.findById(new Uuid(output.id));\n    expect(output).toStrictEqual({\n      id: entity!.id.value,\n      value: 853,\n      created_at: undefined,\n      updated_at: undefined,\n    });\n  });\n});\n`,
      },
    ],
  },
  {
    path: './src/@core/__names__/application/use-case/store-__name__',
    name: 'store-__name__.use-case.input.ts',
    conteudo: `import { IsNotEmpty, IsNumber, validateSync } from 'class-validator';\n\nexport type Store__Name__InputConstructorProps = {\n  value: number;\n};\n\nexport class Store__Name__Input {\n  @IsNumber()\n  @IsNotEmpty()\n  value: number;\n\n  constructor(props: Store__Name__InputConstructorProps) {\n    if (!props) return;\n\n    this.value = props.value;\n  }\n}\n\nexport class ValidateStore__Name__Input {\n  static validate(input: Store__Name__Input) {\n    return validateSync(input);\n  }\n}\n`,
  },

  // get
  {
    path: './src/@core/__names__/application/use-case/get-__name__',
    name: 'get-__name__.use-case.ts',
    conteudo: `import { IUseCase } from '../../../../@shared/application/use-case.interface';\nimport { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';\nimport { I__Name__Repository } from '../../../domain/contracts/__name__.interface';\nimport {\n  __Name__Output,\n  __Name__OutputMapper,\n} from '../../common/__name__.output';\nimport { Get__Name__Input } from './get-__name__.use-case.input';\nimport { NotFoundError } from '../../../../@shared/domain/error/not-found.error';\nimport { __Name__Entity } from '../../../domain/entities/__name__.entity';\n\nexport class Get__Name__UseCase\n  implements IUseCase<Get__Name__Input, __Name__Output>\n{\n  constructor(private readonly ___Name__Repo: I__Name__Repository) {}\n\n  async execute(input: Get__Name__Input): Promise<__Name__Output> {\n    const entity = await this.___Name__Repo.findById(new Uuid(input.id));\n\n    if (!entity) throw new NotFoundError(input.id, __Name__Entity);\n\n    return __Name__OutputMapper.toOutput(entity);\n  }\n}\n\nexport type Store__Name__Output = __Name__Output;\n`,
    children: [
      {
        path: './src/@core/__names__/application/use-case/get-__name__/__tests__',
        name: 'get-__name__.use-case.spec.ts',
        conteudo: `import { __Name__Entity } from '../../../../domain/entities/__name__.entity';\nimport { __Name__InMemoryRepository } from '../../../../infra/db/in-memory/__name__-in-memory.repository';\nimport { Get__Name__UseCase } from '../get-__name__.use-case';\n\ndescribe('Get__Name__UseCase Unit Tests', () => {\n  let useCase: Get__Name__UseCase;\n  let repository: __Name__InMemoryRepository;\n  let entity: __Name__Entity;\n\n  beforeAll(() => {\n    repository = new __Name__InMemoryRepository();\n    useCase = new Get__Name__UseCase(repository);\n\n    entity = __Name__Entity.mock();\n    repository.create(entity);\n  });\n\n  it('should create a fiance', async () => {\n    const spyInsert = jest.spyOn(repository, 'findById');\n    const output = await useCase.execute({ id: entity.id.value });\n\n    expect(spyInsert).toHaveBeenCalledTimes(1);\n    expect(output).toStrictEqual(entity.toJSON());\n  });\n});\n`,
      },
      {
        path: './src/@core/__names__/application/use-case/get-__name__/__tests__',
        name: 'get-__name__.use-case.int.spec.ts',
        conteudo: `import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';\nimport { setupSequelize } from '../../../../../@shared/infra/testing/helpers';\nimport { __Name__Entity } from '../../../../domain/entities/__name__.entity';\nimport __Name__Model from '../../../../infra/db/sequelize/models/__name__.model';\nimport { __Name__Repository } from '../../../../infra/db/sequelize/repositories/__name__.repository';\nimport { Get__Name__UseCase } from '../get-__name__.use-case';\n\ndescribe('Get__Name__UseCase Integration Tests', () => {\n  let useCase: Get__Name__UseCase;\n  let repository: __Name__Repository;\n  let entity: __Name__Entity;\n\n  const setup = setupSequelize({ models: [__Name__Model] });\n\n  beforeEach(() => {\n    const uow = new UnitOfWorkSequelize(setup.sequelize);\n\n    repository = new __Name__Repository(uow, __Name__Model);\n    useCase = new Get__Name__UseCase(repository);\n\n    entity = __Name__Entity.mock();\n    repository.create(entity);\n  });\n\n  it('should create a __Name__', async () => {\n    const output = await useCase.execute({ id: entity.id.value });\n\n    expect(output).toStrictEqual(entity.toJSON());\n  });\n});\n`,
      },
    ],
  },
  {
    path: './src/@core/__names__/application/use-case/get-__name__',
    name: 'get-__name__.use-case.input.ts',
    conteudo: `import { IsNotEmpty, IsUUID, validateSync } from 'class-validator';\n\nexport type Get__Name__InputConstructorProps = {\n  id: string;\n};\n\nexport class Get__Name__Input {\n  @IsUUID('4')\n  @IsNotEmpty()\n  id: string;\n\n  constructor(props: Get__Name__InputConstructorProps) {\n    if (!props) return;\n\n    this.id = props.id;\n  }\n}\n\nexport class ValidateGet__Name__Input {\n  static validate(input: Get__Name__Input) {\n    return validateSync(input);\n  }\n}\n`,
  },

  // update
  {
    path: './src/@core/__names__/application/use-case/update-__name__',
    name: 'update-__name__.use-case.ts',
    conteudo: `import { IUseCase } from '../../../../@shared/application/use-case.interface';\nimport { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';\nimport { I__Name__Repository } from '../../../domain/contracts/__Name__.interface';\nimport {\n  __Name__Output,\n  __Name__OutputMapper,\n} from '../../common/__Name__.output';\nimport { NotFoundError } from '../../../../@shared/domain/error/not-found.error';\nimport { __Name__Entity } from '../../../domain/entities/__Name__.entity';\nimport { Update__Name__Input } from './update-__Name__.use-case.input';\nimport { ApplicationService } from '../../../../@shared/application/application.service';\n\nexport class Update__Name__UseCase\n  implements IUseCase<Update__Name__Input, __Name__Output>\n{\n  constructor(\n    private readonly _appService: ApplicationService,\n    private readonly ___Name__Repo: I__Name__Repository\n  ) {}\n\n  async execute(input: Update__Name__Input): Promise<__Name__Output> {\n    return await this._appService.run(async () => {\n      const entity = await this.___Name__Repo.findById(new Uuid(input.id));\n\n      if (!entity) throw new NotFoundError(input.id, __Name__Entity);\n\n      input.value && entity.changeValue(input.value);\n      input.description && entity.changeDescription(input.description);\n\n      await this.___Name__Repo.update(entity);\n\n      return __Name__OutputMapper.toOutput(entity);\n    });\n  }\n}\n\nexport type Store__Name__Output = __Name__Output;\n`,
    children: [
      {
        path: './src/@core/__names__/application/use-case/update-__name__/__tests__',
        name: 'update-__name__.use-case.spec.ts',
        conteudo: `import { ApplicationService } from '../../../../../@shared/application/application.service';\nimport { __Name__Entity } from '../../../../domain/entities/__Name__.entity';\nimport { __Name__InMemoryRepository } from '../../../../infra/db/in-memory/__Name__-in-memory.repository';\nimport { Update__Name__UseCase } from '../update-__Name__.use-case';\nimport { UnitOfWorkFakeInMemory } from '../../../../../@shared/infra/db/in-memory/fake-unit-of-work-in-memory';\nimport { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';\nimport EventEmitter2 from 'eventemitter2';\n\ndescribe('Update__Name__UseCase Unit Tests', () => {\n  let useCase: Update__Name__UseCase;\n  let repository: __Name__InMemoryRepository;\n  let entity: __Name__Entity;\n\n  beforeAll(async () => {\n    repository = new __Name__InMemoryRepository();\n    const uow = new UnitOfWorkFakeInMemory();\n    const domainEvent = new DomainEventMediator(new EventEmitter2());\n    const app = new ApplicationService(uow, domainEvent);\n\n    useCase = new Update__Name__UseCase(app, repository);\n\n    entity = __Name__Entity.mock();\n    await repository.create(entity);\n  });\n\n  it('should update a fiance', async () => {\n    await useCase.execute({\n      id: entity.id.value,\n      value: 10,\n    });\n\n    const model = await repository.findById(entity.id);\n\n    expect(model!.toJSON()).toMatchObject({\n      id: entity.id.value,\n      value: 10,\n    });\n  });\n});\n`,
      },
      {
        path: './src/@core/__names__/application/use-case/update-__name__/__tests__',
        name: 'update-__name__.use-case.int.spec.ts',
        conteudo: `import EventEmitter2 from 'eventemitter2';\nimport { ApplicationService } from '../../../../../@shared/application/application.service';\nimport { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';\nimport { setupSequelize } from '../../../../../@shared/infra/testing/helpers';\nimport { __Name__Entity } from '../../../../domain/entities/__name__.entity';\nimport __Name__Model from '../../../../infra/db/sequelize/models/__name__.model';\nimport { __Name__Repository } from '../../../../infra/db/sequelize/repositories/__name__.repository';\nimport { Update__Name__UseCase } from '../update-__name__.use-case';\nimport { DomainEventMediator } from '../../../../../@shared/domain/events/domain-event-mediator';\n\ndescribe('Update__Name__UseCase Integration Tests', () => {\n  let useCase: Update__Name__UseCase;\n  let repository: __Name__Repository;\n  let entity: __Name__Entity;\n\n  const setup = setupSequelize({ models: [__Name__Model] });\n\n  beforeEach(async () => {\n    const uow = new UnitOfWorkSequelize(setup.sequelize);\n    const domainEvent = new DomainEventMediator(new EventEmitter2());\n    const app = new ApplicationService(uow, domainEvent);\n\n    repository = new __Name__Repository(uow, __Name__Model);\n    useCase = new Update__Name__UseCase(app, repository);\n\n    entity = __Name__Entity.mock();\n    await repository.create(entity);\n  });\n\n  it('should update a __Name__', async () => {\n    await useCase.execute({\n      id: entity.id.value,\n      value: 10,\n    });\n\n    const model = await repository.findById(entity.id);\n\n    expect(model!.toJSON()).toMatchObject({\n      id: entity.id.value,\n      value: 10,\n    });\n  });\n});\n`,
      },
    ],
  },
  {
    path: './src/@core/__names__/application/use-case/update-__name__',
    name: 'update-__name__.use-case.input.ts',
    conteudo: `import {\n  IsNotEmpty,\n  IsNumber,\n  IsOptional,\n  IsUUID,\n  validateSync,\n} from 'class-validator';\n\nexport type Update__Name__InputConstructorProps = {\n  id: string;\n  value?: number;\n  description?: string;\n};\n\nexport class Update__Name__Input {\n  @IsUUID('4')\n  @IsNotEmpty()\n  id: string;\n\n  @IsNumber()\n  @IsOptional()\n  value?: number;\n\n  constructor(props: Update__Name__InputConstructorProps) {\n    if (!props) return;\n\n    this.id = props.id;\n    this.value = props.value;\n  }\n}\n\nexport class ValidateGet__Name__Input {\n  static validate(input: Update__Name__Input) {\n    return validateSync(input);\n  }\n}\n`,
  },

  // list
  {
    path: './src/@core/__names__/application/use-case/list-__name__',
    name: 'list-__name__.use-case.ts',
    conteudo: `import {\n  PaginationOutput,\n  PaginationOutputMapper,\n} from '../../../../@shared/application/pagination-output';\nimport { IUseCase } from '../../../../@shared/application/use-case.interface';\nimport {\n  __Name__SearchParams,\n  __Name__SearchResult,\n  I__Name__Repository,\n} from '../../../domain/contracts/__name__.interface';\nimport {\n  __Name__Output,\n  __Name__OutputMapper,\n} from '../../common/__name__.output';\nimport { List__Name__Input } from './list-__name__.use-case.input';\n\nexport class List__Name__UseCase\n  implements IUseCase<List__Name__Input, List__Name__sOutput>\n{\n  constructor(private readonly ___Name__Repo: I__Name__Repository) {}\n\n  async execute(input: List__Name__Input): Promise<List__Name__sOutput> {\n    const entities = await this.___Name__Repo.search(\n      new __Name__SearchParams(input)\n    );\n\n    return this.toOutput(entities);\n  }\n\n  private async toOutput(\n    searchResult: __Name__SearchResult\n  ): Promise<List__Name__sOutput> {\n    const { items: _items } = searchResult;\n\n    const items = _items.map((i) => {\n      return __Name__OutputMapper.toOutput(i);\n    });\n    return PaginationOutputMapper.toOutput(items, searchResult);\n  }\n}\n\nexport type List__Name__sOutput = PaginationOutput<__Name__Output>;\n`,
    children: [
      {
        path: './src/@core/__names__/application/use-case/list-__name__/__tests__',
        name: 'list-__name__.use-case.spec.ts',
        conteudo: `import { __Name__Entity } from '../../../../domain/entities/__name__.entity';\nimport { __Name__InMemoryRepository } from '../../../../infra/db/in-memory/__name__-in-memory.repository';\nimport { List__Name__UseCase } from '../list-__name__.use-case';\n\ndescribe('List__Name__UseCase Unit Tests', () => {\n  let useCase: List__Name__UseCase;\n  let repository: __Name__InMemoryRepository;\n  let entity: __Name__Entity;\n\n  beforeAll(() => {\n    repository = new __Name__InMemoryRepository();\n    useCase = new List__Name__UseCase(repository);\n\n    entity = __Name__Entity.mock();\n    repository.create(entity);\n  });\n\n  it('should create a fiance', async () => {\n    const spyInsert = jest.spyOn(repository, 'search');\n    const output = await useCase.execute({});\n\n    expect(spyInsert).toHaveBeenCalledTimes(1);\n    expect(output).toStrictEqual({\n      current_page: 1,\n      last_page: 1,\n      per_page: 15,\n      total: 1,\n      items: [entity.toJSON()],\n    });\n  });\n});\n`,
      },
      {
        path: './src/@core/__names__/application/use-case/list-__name__/__tests__',
        name: 'list-__name__.use-case.int.spec.ts',
        conteudo: `import { UnitOfWorkSequelize } from '../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';\nimport { setupSequelize } from '../../../../../@shared/infra/testing/helpers';\nimport { __Name__Entity } from '../../../../domain/entities/__name__.entity';\nimport __Name__Model from '../../../../infra/db/sequelize/models/__name__.model';\nimport { __Name__Repository } from '../../../../infra/db/sequelize/repositories/__name__.repository';\nimport { List__Name__UseCase } from '../list-__name__.use-case';\n\ndescribe('List__Name__UseCase Unit Tests', () => {\n  let useCase: List__Name__UseCase;\n  let repository: __Name__Repository;\n  let entity: __Name__Entity;\n\n  const setup = setupSequelize({ models: [__Name__Model] });\n\n  beforeEach(() => {\n    const uow = new UnitOfWorkSequelize(setup.sequelize);\n\n    repository = new __Name__Repository(uow, __Name__Model);\n    useCase = new List__Name__UseCase(repository);\n\n    entity = __Name__Entity.mock();\n    repository.create(entity);\n  });\n\n  it('should create a fiance', async () => {\n    const spyInsert = jest.spyOn(repository, 'search');\n    const output = await useCase.execute({});\n\n    expect(spyInsert).toHaveBeenCalledTimes(1);\n    expect(output).toStrictEqual({\n      current_page: 1,\n      last_page: 1,\n      per_page: 15,\n      total: 1,\n      items: [entity.toJSON()],\n    });\n  });\n});\n`,
      },
    ],
  },
  {
    path: './src/@core/__names__/application/use-case/list-__name__',
    name: 'list-__name__.use-case.input.ts',
    conteudo: `import { ValidateNested, validateSync } from 'class-validator';\nimport { SearchInput } from '../../../../@shared/application/search-input';\nimport { SortDirection } from '../../../../@shared/domain/repository/search-params';\nimport { __Name__Filter } from '../../../domain/contracts/__name__.interface';\n\nexport class List__Name__Input implements SearchInput<__Name__Filter> {\n  page?: number;\n  per_page?: number;\n  sort?: string;\n  sort_dir?: SortDirection;\n  @ValidateNested()\n  filter?: __Name__Filter;\n}\n\nexport class ValidateList__Name__Input {\n  static validate(input: List__Name__Input) {\n    return validateSync(input);\n  }\n}\n`,
  },

  // domain
  {
    path: './src/@core/__names__/domain/entities',
    name: '__name__.entity.ts',
    conteudo: `import { BadRequestException } from '@nestjs/common';\nimport { Entity } from '../../../@shared/domain/entity';\nimport { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';\nimport { __Name__Validator } from '../validations/__name__.validator';\n\nexport type __Name__EntityType = {\n  id?: string;\n  value: number;\n  created_at?: Date;\n  updated_at?: Date;\n  deleted_at?: Date;\n};\n\nexport class __Name__Entity extends Entity {\n  id: Uuid;\n  value: number;\n  created_at: Date;\n  updated_at: Date;\n  deleted_at: Date;\n\n  constructor(props: __Name__EntityType) {\n    super();\n\n    this.id = new Uuid(props.id);\n    this.value = props.value;\n    this.created_at = props.created_at;\n    this.updated_at = props.updated_at;\n    this.deleted_at = props.deleted_at;\n\n    this.validate();\n  }\n\n  static create(props: __Name__EntityType) {\n    return new this(props);\n  }\n\n  static mock() {\n    return new this({\n      value: 15000,\n      created_at: new Date(),\n      updated_at: new Date(),\n      deleted_at: null,\n    });\n  }\n\n  toJSON() {\n    return {\n      id: this.id.value,\n      value: this.value,\n      created_at: this.created_at,\n      updated_at: this.updated_at,\n    };\n  }\n\n  validate(fields?: string[]) {\n    return __Name__Validator.create().validate(this.notification, this, fields);\n  }\n\n  changeValue(value: number) {\n    if (!value) throw new BadRequestException();\n\n    this.value = value;\n    this.validate(['value']);\n  }\n\n}\n`,
    children: [
      {
        path: './src/@core/__names__/domain/__tests__',
        name: '__name__.entity.spec.ts',
        conteudo: `import { __Name__Entity } from '../__name__.entity';\n\ndescribe('__Name__ unit tests', () => {\n  const entity = __Name__Entity.mock();\n\n  it('Should create a new entity entity', () => {\n    expect(entity).toBeDefined();\n    expect(entity).toBeDefined();\n    expect(entity.value).toBeDefined();\n  }, 30000);\n});\n`,
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

  // infra repository
  {
    path: './src/@core/__names__/infra/db/in-memory',
    name: '__name__-in-memory.repository.ts',
    conteudo: `import { SortDirection } from '../../../../@shared/domain/repository/search-params';\nimport { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';\nimport { InMemorySearchableRepository } from '../../../../@shared/infra/db/in-memory/in-memory.repository';\nimport {\n  __Name__Filter,\n  I__Name__Repository,\n} from '../../../domain/contracts/__name__.interface';\nimport { __Name__Entity } from '../../../domain/entities/__name__.entity';\n\nexport class __Name__InMemoryRepository\n  extends InMemorySearchableRepository<__Name__Entity, Uuid>\n  implements I__Name__Repository\n{\n  sortableFields: string[] = ['name', 'created_at'];\n\n  protected async applyFilter(\n    items: __Name__Entity[],\n    filter: __Name__Filter | null\n  ): Promise<__Name__Entity[]> {\n    if (!filter) {\n      return items;\n    }\n\n    return items;\n  }\n  getEntity(): new (...args: any[]) => __Name__Entity {\n    return __Name__Entity;\n  }\n\n  protected applySort(\n    items: __Name__Entity[],\n    sort: string | null,\n    sort_dir: SortDirection | null\n  ) {\n    return sort\n      ? super.applySort(items, sort, sort_dir)\n      : super.applySort(items, 'created_at', 'desc');\n  }\n}\n`,
    children: [
      {
        path: './src/@core/__names__/infra/db/in-memory/__tests__',
        name: '__name__-in-memory.repository.spec.ts',
        conteudo: `import { __Name__Entity } from '../../../../domain/entities/__name__.entity';\nimport { __Name__InMemoryRepository } from '../__name__-in-memory.repository';\n\ndescribe('__Name__InMemoryRepository', () => {\n  let repository: __Name__InMemoryRepository;\n\n  beforeEach(() => (repository = new __Name__InMemoryRepository()));\n  it('should no filter items when filter object is null', async () => {\n    const items = [__Name__Entity.mock()];\n    const filterSpy = jest.spyOn(items, 'filter' as any);\n\n    const itemsFiltered = await repository['applyFilter'](items, null);\n    expect(filterSpy).not.toHaveBeenCalled();\n    expect(itemsFiltered).toStrictEqual(items);\n  });\n});\n`,
      },
    ],
  },
  {
    path: './src/@core/__names__/infra/db/sequelize/repositories',
    name: '__name__.repository.ts',
    conteudo: `import {\n  __Name__SearchParams,\n  __Name__SearchResult,\n  I__Name__Repository,\n} from '../../../../domain/contracts/__name__.interface';\nimport { __Name__Entity } from '../../../../domain/entities/__name__.entity';\nimport { __Name__ModelMapper } from '../models/__name__.model.mapper';\nimport __Name__Model from '../models/__name__.model';\nimport { NotFoundError } from '../../../../../@shared/domain/error/not-found.error';\nimport { Uuid } from '../../../../../@shared/domain/value-objects/uuid.vo';\nimport { IUnitOfWork } from '../../../../../@shared/domain/repository/unit-of-work.interface';\n\nexport class __Name__Repository implements I__Name__Repository {\n  sortableFields: string[] = ['name', 'created_at'];\n\n  constructor(\n    private uow: IUnitOfWork,\n    private model: typeof __Name__Model\n  ) {}\n\n  async create(entity: __Name__Entity): Promise<void> {\n    const modelProps = __Name__ModelMapper.toModel(entity);\n    await this.model.create(modelProps);\n  }\n\n  async update(entity: __Name__Entity): Promise<void> {\n    const modelProps = __Name__ModelMapper.toModel(entity);\n    const [affectedRows] = await this.model.update(modelProps, {\n      where: { id: entity.id.value },\n    });\n\n    if (affectedRows !== 1) {\n      throw new NotFoundError(entity.id.value, this.getEntity());\n    }\n  }\n\n  async delete(entity_id: Uuid): Promise<void> {\n    const affectedRows = await this.model.destroy({\n      where: { id: entity_id.value },\n    });\n\n    if (affectedRows !== 1) {\n      throw new NotFoundError(entity_id, this.getEntity());\n    }\n  }\n\n  async findById(entity_id: Uuid): Promise<__Name__Entity | null> {\n    try {\n      const model = await this.model.findByPk(entity_id.value);\n\n      return model ? __Name__ModelMapper.toEntity(model) : null;\n    } catch (error) {\n      console.log(error);\n      throw error;\n    }\n  }\n\n  async findAll(): Promise<__Name__Entity[]> {\n    const models = await this.model.findAll();\n    return models.map((model) => {\n      return __Name__ModelMapper.toEntity(model);\n    });\n  }\n\n  async search(props: __Name__SearchParams): Promise<__Name__SearchResult> {\n    const offset = (props.page - 1) * props.per_page;\n    const limit = props.per_page;\n    const { rows: models, count } = await this.model.findAndCountAll({\n      ...(props.filter && {\n        where: { value: props.filter },\n      }),\n      ...(props.sort && this.sortableFields.includes(props.sort)\n        ? { order: [[props.sort, props.sort_dir]] }\n        : { order: [['created_at', 'desc']] }),\n      offset,\n      limit,\n    });\n\n    return new __Name__SearchResult({\n      items: models.map((model) => {\n        return __Name__ModelMapper.toEntity(model);\n      }),\n      current_page: props.page,\n      per_page: props.per_page,\n      total: count,\n    });\n  }\n\n  getEntity(): new (...args: any[]) => __Name__Entity {\n    return __Name__Entity;\n  }\n}\n`,
    children: [
      {
        path: './src/@core/__names__/infra/db/sequelize/repositories/__tests__',
        name: '__name__.repository.spec.ts',
        conteudo: `import { NotFoundError } from '../../../../../../@shared/domain/error/not-found.error';\nimport { Uuid } from '../../../../../../@shared/domain/value-objects/uuid.vo';\nimport { UnitOfWorkSequelize } from '../../../../../../@shared/infra/db/sequelize/unit-of-work-sequelize';\nimport { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';\nimport { __Name__Entity } from '../../../../../domain/entities/__name__.entity';\nimport __Name__Model from '../../models/__name__.model';\nimport { __Name__Repository } from '../__name__.repository';\n\ndescribe('__Name__Repository Integration Test', () => {\n  let repository: __Name__Repository;\n  const setup = setupSequelize({ models: [__Name__Model] });\n\n  beforeEach(async () => {\n    repository = new __Name__Repository(\n      new UnitOfWorkSequelize(setup.sequelize),\n      __Name__Model\n    );\n  });\n\n  it('should inserts a new entity', async () => {\n    const __name__ = __Name__Entity.mock();\n    await repository.create(__name__);\n    const __name__Created = await repository.findById(__name__.id);\n    expect(__name__Created!.toJSON()).toStrictEqual({\n      ...__name__.toJSON(),\n      updated_at: __name__Created.updated_at,\n    });\n  });\n\n  it('should finds a entity by id', async () => {\n    let entityFound = await repository.findById(new Uuid());\n    expect(entityFound).toBeNull();\n\n    const entity = __Name__Entity.mock();\n    await repository.create(entity);\n    entityFound = await repository.findById(entity.id);\n    expect(entity.toJSON()).toStrictEqual({\n      ...entityFound!.toJSON(),\n      updated_at: entity.updated_at,\n    });\n  });\n\n  it('should return all __names__', async () => {\n    const entity = __Name__Entity.mock();\n    await repository.create(entity);\n    const entities = await repository.findAll();\n\n    expect(entities).toHaveLength(1);\n    expect(JSON.stringify([entities[0].toJSON()])).toBe(\n      JSON.stringify([\n        { ...entity.toJSON(), updated_at: entities[0].updated_at },\n      ])\n    );\n  });\n\n  it('should throw error on update when a entity not found', async () => {\n    const entity = __Name__Entity.mock();\n    await expect(repository.update(entity)).rejects.toThrow(\n      new NotFoundError(entity.id.value, __Name__Entity)\n    );\n  });\n\n  it('should delete a entity', async () => {\n    const entity = __Name__Entity.mock();\n    await repository.create(entity);\n\n    await repository.delete(entity.id);\n    await expect(repository.findById(entity.id)).resolves.toBeNull();\n  });\n});\n`,
      },
    ],
  },

  // infra model
  {
    path: './src/@core/__names__/infra/db/sequelize/models',
    name: '__name__.model.ts',
    conteudo: `import { Column, DataType, Table } from 'sequelize-typescript';\nimport SequelizeModel from '../../../../../@shared/infra/db/sequelize/models/sequelize.model';\n\nexport type __Name__ModelType = {\n  id: string;\n  value: number;\n  description: string;\n  created_at: Date;\n  updated_at: Date;\n  deleted_at: Date;\n};\n\n@Table({\n  tableName: '__names__',\n  createdAt: 'created_at',\n  updatedAt: 'updated_at',\n  deletedAt: 'deleted_at',\n  paranoid: true,\n})\nexport default class __Name__Model extends SequelizeModel<__Name__ModelType> {\n  @Column({ type: DataType.BIGINT, allowNull: false })\n  declare value: number;\n\n  @Column({ type: DataType.STRING(255), allowNull: false })\n  declare description: string;\n}\n`,
    children: [
      {
        path: './src/@core/__names__/infra/db/sequelize/models/__tests__',
        name: '__name__.model.spec.ts',
        conteudo: `import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';\nimport __name__Model from '../__name__.model';\n\ndescribe('__Names__ model integration tests', () => {\n  setupSequelize();\n\n  test('table name', () => {\n    expect(__name__Model.tableName).toBe('__names__');\n  });\n\n  it('Should test mapping', () => {\n    const attributesMap = __name__Model.getAttributes();\n\n    expect(attributesMap).toHaveProperty('id');\n    expect(attributesMap).toHaveProperty('value');\n    expect(attributesMap).toHaveProperty('created_at');\n    expect(attributesMap).toHaveProperty('updated_at');\n    expect(attributesMap).toHaveProperty('deleted_at');\n  }, 30000);\n});\n`,
      },
    ],
  },
  {
    path: './src/@core/__names__/infra/db/sequelize/models',
    name: '__name__.model.mapper.ts',
    conteudo: `import { __Name__Entity } from '../../../../domain/entities/__name__.entity';\nimport __Name__Model from './__name__.model';\nimport '../../../../../../types/number';\n\nexport class __Name__ModelMapper {\n  static toModel(entity: __Name__Entity) {\n    return {\n      id: entity.id.value,\n      value: entity.value.toBigint(),\n      created_at: entity.created_at,\n      updated_at: entity.updated_at,\n      deleted_at: entity.deleted_at,\n    };\n  }\n\n  static toEntity(model: __Name__Model) {\n    return new __Name__Entity({\n      id: model.id,\n      value: parseFloat(model.value.toString()).toDecimal(),\n      created_at: model.created_at,\n      updated_at: model.updated_at,\n      deleted_at: model.deleted_at,\n    });\n  }\n}\n`,
    children: [
      {
        path: './src/@core/__names__/infra/db/sequelize/models/__tests__',
        name: '__name__.model.mapper.spec.ts',
        conteudo: `import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';\nimport { __Name__Entity } from '../../../../../domain/entities/__name__.entity';\nimport __Name__Model from '../__name__.model';\nimport { __Name__ModelMapper } from '../__name__.model.mapper';\n\ndescribe('__Name__ model mapper tests', () => {\n  setupSequelize();\n\n  const Entity = __Name__Entity.mock();\n\n  it('Should map to model', () => {\n    const model = __Name__Model.build(Entity.toJSON());\n\n    const entityMappedToModel = __Name__ModelMapper.toModel(Entity);\n\n    expect(model!.toJSON()).toMatchObject(entityMappedToModel);\n  }, 30000);\n\n  it('Should map to entity', () => {\n    const model = __Name__Model.build(Entity.toJSON());\n\n    const modelMappedToEntity = __Name__ModelMapper.toEntity(model);\n\n    expect(Entity.toJSON()).toMatchObject(modelMappedToEntity.toJSON());\n  }, 30000);\n});\n`,
      },
    ],
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
    const path = `${element.path.replace('__names__', names).replace('__name__', name)}`;

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
        .replaceAll(
          '__Names__',
          names[0].toUpperCase() + name.replace(names[0], '')
        )
        .replaceAll('__name__', name)
        .replaceAll('__names__', names)
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
