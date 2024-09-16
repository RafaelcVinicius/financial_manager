import { SortDirection } from '../../../@core/@shared/domain/repository/search-params';
import { ExampleOutput } from '../../../@core/examples/application/common/example.output';
import { CreateExampleOutput } from '../../../@core/examples/application/use-case/create-example/create-example.use-case';
import { ListExamplesOutput } from '../../../@core/examples/application/use-case/list-example/list-example.use-case';
import { UpdateExampleInput } from '../../../@core/examples/application/use-case/update-example/update-example.use-case.input';
import { CreateExampleDto } from '../dto/create-example.dto';
import { ExamplesController } from '../examples.controller';
import {
  ExamplePresenter,
  ExamplePresenterCollection,
} from '../examples.presenter';

describe('ExamplesController Unit Tests', () => {
  let controller: ExamplesController;

  beforeEach(async () => {
    controller = new ExamplesController();
  });

  it('should creates a example', async () => {
    //Arrange
    const output: CreateExampleOutput = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      value: 150,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    //@ts-expect-error defined part of methods
    controller['createUseCase'] = mockCreateUseCase;
    const input: CreateExampleDto = {
      value: 15,
    };

    //Act
    const presenter = await controller.create(input);

    //Assert
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(presenter).toBeInstanceOf(ExamplePresenter);
    expect(presenter).toStrictEqual(new ExamplePresenter(output));
  });

  it('should updates a Example', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: ExampleOutput = {
      id,
      value: 15,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: Omit<UpdateExampleInput, 'id'> = {
      value: 15,
    };
    const presenter = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(presenter).toBeInstanceOf(ExamplePresenter);
    expect(presenter).toStrictEqual(new ExamplePresenter(output));
  });

  it('should deletes a Example', async () => {
    const expectedOutput = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error defined part of methods
    controller['deleteUseCase'] = mockDeleteUseCase;
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    expect(controller.delete(id)).toBeInstanceOf(Promise);
    const output = await controller.delete(id);
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should gets a Example', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: ExampleOutput = {
      id,
      value: 15,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['getUseCase'] = mockGetUseCase;
    const presenter = await controller.get(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(presenter).toBeInstanceOf(ExamplePresenter);
    expect(presenter).toStrictEqual(new ExamplePresenter(output));
  });

  it('should list Examples', async () => {
    const output: ListExamplesOutput = {
      items: [
        {
          id: '9366b7dc-2d71-4799-b91c-c64adb205104',
          value: 15,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['listUseCase'] = mockListUseCase;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test',
    };
    const presenter = await controller.list(searchParams);
    expect(presenter).toBeInstanceOf(ExamplePresenterCollection);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(presenter).toEqual(new ExamplePresenterCollection(output));
  });
});
