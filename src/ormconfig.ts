import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'fhnest',
  password: 'fhnest',
  database: 'fhnest',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

const dataSource = new DataSource(config);

export default dataSource;
export { config };
