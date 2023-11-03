import { aesEncrypt, aesDecrypt, compareSync } from './cryptogram';
import { SnowflakeIdGenerate } from './snowflake';

const arr = (arr: Array<number>) => {
  return Array.from(arr);
};

export * from './cryptogram';
export * from './snowflake';
export default {
  arr,
  aesEncrypt,
  aesDecrypt,
  compareSync,
  SnowflakeIdGenerate,
};
