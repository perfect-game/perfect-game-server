/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

require('dotenv').config();

module.exports = {
  application: {
    port: 10000,
    cors: true,
    graphql: {
      path: '/graphql',
      debug: true,
      playground: true,
    },
    useNativeLogger: true,
    useCustomLogger: true,
  },
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'perfect',
    migrationsTableName: '_migrations',
    migrations: ['./dist/migrations/*.js'],
    synchronize: true,
    logging: ['query', 'error'],
    extra: {
      connectionLimit: 30,
    },
    cli: {
      migrationsDir: 'migrations',
    },
  },
  logger: {
    level: 'verbose',
    transports: ['console'],
    httpTransportOptions: {
      host: 'localhost',
      port: 10000,
    },
  },
};
