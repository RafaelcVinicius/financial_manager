import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { FinanceEntity } from '../../../../../domain/entities/finance.entity';
import FinanceModel from '../finance.model';
import { FinanceModelMapper } from '../finance.model.mapper';

describe('Finance model mapper tests', () => {
  setupSequelize();

  const financeEntiry = FinanceEntity.mock();

  it('Should map to model', () => {
    const model = FinanceModel.build(financeEntiry.toJSON());

    const financeEntityMappedToModel =
      FinanceModelMapper.toModel(financeEntiry);

    expect(model!.toJSON()).toMatchObject(financeEntityMappedToModel);
  }, 30000);

  it('Should map to entity', () => {
    const model = FinanceModel.build(financeEntiry.toJSON());

    const financeModelMappedToEntity = FinanceModelMapper.toEntity(model);

    expect(financeEntiry.toJSON()).toMatchObject(
      financeModelMappedToEntity.toJSON()
    );
  }, 30000);
});
