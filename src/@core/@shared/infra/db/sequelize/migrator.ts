import { join } from 'path';
import { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';

export function migrator(sequelize: Sequelize) {
  return new Umzug({
    migrations: {
      glob: [
        './migrations/*.{js,ts}',
        {
          cwd: join(__dirname, '.'),
        },
      ],
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });
}
