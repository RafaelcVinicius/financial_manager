import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Config } from '../config';

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;

  const dbConfig = Config.db();

  beforeAll(async () => {
    _sequelize = new Sequelize({
      ...dbConfig,
      ...options,
    });
  });

  if (dbConfig.dialect == 'sqlite') {
    beforeEach(async () => {
      await _sequelize.sync({ force: true });
    });
  }

  afterAll(async () => {
    if (_sequelize) {
      await _sequelize.close();
    }
  });

  return {
    get sequelize() {
      return _sequelize;
    },
  };
}
