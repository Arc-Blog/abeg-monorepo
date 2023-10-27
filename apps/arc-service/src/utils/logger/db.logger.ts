import Logger from './index';
import Log4js from './log4js';

export class DbLogger implements Logger {
  mysqlLogger: Log4js.Logger;

  // static instance: DbLogger;

  // static getInstance() {
  //   if (!DbLogger.instance) {
  //     DbLogger.instance = new DbLogger();
  //   }
  //   return DbLogger.instance;
  // }

  // private constructor() {}

  // private static instance: DbLogger;

  // private static getInstance() {
  //   if (!DbLogger.instance) {
  //     DbLogger.instance = new DbLogger();
  //   }
  //     return DbLogger.instance;
  // }
  constructor() {
    this.mysqlLogger = Log4js.getLogger('mysql');
  }

  logQuery(query: string /* parameters?: any[], queryRunner?: QueryRunner */) {
    this.mysqlLogger.info(query);
  }

  logQueryError(
    error: string,
    query: string,
    // parameters?: any[],
    /* queryRunner?: QueryRunner */
  ) {
    this.mysqlLogger.error(query, error);
  }

  logQuerySlow(
    time: number,
    query: string,
    // parameters?: any[],
    /* queryRunner?: QueryRunner */
  ) {
    this.mysqlLogger.info(query, time);
  }

  logSchemaBuild(message: string /* queryRunner?: QueryRunner */) {
    this.mysqlLogger.info(message);
  }

  logMigration(message: string /* queryRunner?: QueryRunner */) {
    this.mysqlLogger.info(message);
  }
  log(
    level: 'log' | 'info' | 'warn',
    message: any /* queryRunner?: QueryRunner */,
  ) {
    switch (level) {
      case 'info': {
        this.mysqlLogger.info(message);
        break;
      }
      case 'warn': {
        this.mysqlLogger.warn(message);
      }
    }
  }
}
