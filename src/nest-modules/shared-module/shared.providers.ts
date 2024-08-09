import { ApplicationService } from '../../@core/@shared/application/application.service';
import { IUnitOfWork } from '../../@core/@shared/domain/repository/unit-of-work.interface';
import { DomainEventMediator } from '../../@core/@shared/domain/events/domain-event-mediator';

export const REPOSITORIES = {
  APPLICATION_SERVICE_REPOSITORY: {
    provide: 'ApplicationService',
    useExisting: ApplicationService,
  },
  APPLICATION_SERVICE_SEQUELIZE_REPOSITORY: {
    provide: ApplicationService,
    useFactory: (
      uow: IUnitOfWork,
      domainEventMediator: DomainEventMediator
    ) => {
      return new ApplicationService(uow, domainEventMediator);
    },
    inject: ['UnitOfWork', DomainEventMediator],
  },
};

export const USE_CASE_PROVIDERS = {
  REPOSITORIES,
};
