import * as Path from 'path';
import * as StackTrace from 'stacktrace-js';
import Log4js from './log4js';
import { LoggerLevel } from './logger.level';

// 定义log类方法
export default class Logger {
  static logger: Log4js.Logger = Log4js.getLogger('default');

  static trace(...args) {
    Logger.logger.trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args) {
    Logger.logger.debug(Logger.getStackTrace(), ...args);
  }

  static log(...args) {
    Logger.logger.info(Logger.getStackTrace(), ...args);
  }

  static info(...args) {
    Logger.logger.info(Logger.getStackTrace(), ...args);
  }

  static warn(...args) {
    Logger.logger.warn(Logger.getStackTrace(), ...args);
  }

  static warning(...args) {
    Logger.logger.warn(Logger.getStackTrace(), ...args);
  }

  static error(...args) {
    Logger.logger.error(Logger.getStackTrace(), ...args);
  }

  static fatal(...args) {
    Logger.logger.fatal(Logger.getStackTrace(), ...args);
  }

  static mail(...args) {
    const loggerCustom = Log4js.getLogger('mail');
    loggerCustom.info(Logger.getStackTrace(), ...args);
  }

  static access(...args) {
    const loggerCustom = Log4js.getLogger('http');
    loggerCustom.info(Logger.getStackTrace(), ...args);
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列 打印执行哪一行代码
  // StackTrace 可参考 https://www.npmjs.com/package/stacktrace-js
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];
    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): `;
  }
}

Logger.logger.level = LoggerLevel.TRACE;
