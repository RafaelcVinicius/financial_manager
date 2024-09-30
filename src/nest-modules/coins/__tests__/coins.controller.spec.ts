import { SortDirection } from '../../../@core/@shared/domain/repository/search-params';
import { CoinOutput } from '../../../@core/coins/application/common/coin.output';
import { CreateCoinOutput } from '../../../@core/coins/application/use-case/create-coin/create-coin.use-case';
import { ListCoinsOutput } from '../../../@core/coins/application/use-case/list-coin/list-coin.use-case';
import { UpdateCoinInput } from '../../../@core/coins/application/use-case/update-coin/update-coin.use-case.input';
import { CreateCoinDto } from '../dto/create-coin.dto';
import { CoinsController } from '../coins.controller';
import { CoinPresenter, CoinPresenterCollection } from '../coins.presenter';

describe('CoinsController Unit Tests', () => {
  let controller: CoinsController;

  beforeEach(async () => {
    controller = new CoinsController();
  });

  it('should creates a coin', async () => {
    //Arrange
    const output: CreateCoinOutput = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 0.123456,
      unit_price: 90000,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    //@ts-expect-error defined part of methods
    controller['createUseCase'] = mockCreateUseCase;
    const input: CreateCoinDto = {
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 0.178945,
      unit_price: 15000,
    };

    //Act
    const presenter = await controller.create(input);

    //Assert
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(presenter).toBeInstanceOf(CoinPresenter);
    expect(presenter).toStrictEqual(new CoinPresenter(output));
  });

  it('should updates a Coin', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: CoinOutput = {
      id,
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 0.123456,
      unit_price: 90000,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: Omit<UpdateCoinInput, 'id'> = {
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 1.9856,
      unit_price: 8000,
    };
    const presenter = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(presenter).toBeInstanceOf(CoinPresenter);
    expect(presenter).toStrictEqual(new CoinPresenter(output));
  });

  it('should deletes a Coin', async () => {
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

  it('should gets a Coin', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: CoinOutput = {
      id,
      name: 'Bitcoin',
      code: 'BTC',
      quantity: 0.023456,
      unit_price: 150000,
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
    expect(presenter).toBeInstanceOf(CoinPresenter);
    expect(presenter).toStrictEqual(new CoinPresenter(output));
  });

  it('should list Coins', async () => {
    const output: ListCoinsOutput = {
      items: [
        {
          id: '9366b7dc-2d71-4799-b91c-c64adb205104',
          name: 'Bitcoin',
          code: 'BTC',
          quantity: 0.123456,
          unit_price: 90000,
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
    expect(presenter).toBeInstanceOf(CoinPresenterCollection);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(presenter).toEqual(new CoinPresenterCollection(output));
  });
});
