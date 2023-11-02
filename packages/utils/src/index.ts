import { aesDecrypt, aesEncrypt, compareSync } from './cryptogram';
import SnowflakeId from './snowflake';

const index = {
  aesDecrypt,
  aesEncrypt,
  compareSync,
  SnowflakeId,
};

export default index;
