import { Controller, Post, Inject, Body } from '@nestjs/common';
import { StoreFinanceUseCase } from '../../@core/finances/application/use-case/create-finance/store-finance.use-case';
import { FinanceOutput } from '../../@core/finances/application/common/finance.output';
import { StoreFinanceDto } from './dto/store_finance_dto';
import { FinancePresenter } from './finances.presenter';

@Controller('/')
export class FinancesController {
  @Inject(StoreFinanceUseCase)
  private storeUseCase: StoreFinanceUseCase;

  @Post()
  async store(@Body() storePlanDto: StoreFinanceDto) {
    const output = await this.storeUseCase.execute(storePlanDto);
    return FinancesController.serialize(output);
  }

  static serialize(output: FinanceOutput) {
    return new FinancePresenter(output);
  }
}
