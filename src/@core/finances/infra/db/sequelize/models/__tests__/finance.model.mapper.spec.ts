import { setupSequelize } from '../../../../../../@shared/infra/testing/helpers';
import { FinanceEntity } from '../../../../../domain/entities/finance.entity';
import FinanceModel from '../finance.model';
import { FinanceModelMapper } from '../finance.model.mapper';

describe('Finance model mapper tests', () => {
  setupSequelize({ models: [FinanceModel] });

  const financeEntity = FinanceEntity.mock();

  it('Should map to model', () => {
    const model = FinanceModel.build({
      ...financeEntity.toJSON(),
      value: financeEntity.value * 1000000,
    });

    const financeEntityMappedToModel =
      FinanceModelMapper.toModel(financeEntity);

    expect(model!.toJSON()).toMatchObject(financeEntityMappedToModel);
  }, 30000);

  it('Should map to entity', () => {
    const model = FinanceModel.build({
      ...financeEntity.toJSON(),
      value: financeEntity.value * 1000000,
    });

    const financeModelMappedToEntity = FinanceModelMapper.toEntity(model);

    expect(financeEntity.toJSON()).toMatchObject(
      financeModelMappedToEntity.toJSON()
    );
  }, 30000);
});
