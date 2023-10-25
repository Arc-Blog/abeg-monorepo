import crypto from 'crypto';

// AES 128 位密钥可以表示为 32 个字符的十六进制字符串。将需要 24 个 base64 字符。
// AES 256 位密钥可以表示为 64 个字符的十六进制字符串。将需要 44 个 base64 字符。

// const key = Buffer.from('01234567890123456789012345678901', 'utf-8');
// const iv = Buffer.from('0123456789012345', 'utf-8');
/**
 * 十六位十六进制数作为密钥或者编译位
 * @param key 密钥或者密钥偏移位
 * @returns Buffer
 */
function secretKeyIv(key: string): Buffer {
  return Buffer.from(key, 'utf-8');
}

/**
 * AES对称加密函数 aesEncrypt
 * @param data 待加密数据
 * @param key 秘钥
 * @param iv 密钥偏移量
 */
export function aesEncrypt(data: any, key: string, iv: string) {
  if (typeof data === 'object') data = JSON.stringify(data);
  console.log(secretKeyIv(key), secretKeyIv(iv));
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKeyIv(key), secretKeyIv(iv));
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

/**
 * 解密
 * @param encrypted 加密数据
 * @param key 秘钥
 * @param iv 密钥偏移量
 * @returns 明文密钥
 */
export function aesDecrypt(encrypted: string, key: string, iv: string) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKeyIv(key), secretKeyIv(iv));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export function compareSync(s: string, encrypted: string, key: string, iv: string) {
  if (typeof s !== 'string' || typeof encrypted !== 'string')
    throw Error('Illegal arguments: ' + typeof s + ', ' + typeof encrypted);
  return safeStringCompare(s, aesDecrypt(encrypted, key, iv));
}

/**
 * 恒定时间内比较两个相同长度的字符串。
 * @param {string} known 长度必须正确
 * @param {string} unknown 必须与“known”长度相同
 * @returns {boolean}
 * @inner
 */
function safeStringCompare(known: string, unknown: string) {
  console.log(known, unknown);
  let diff = known.length ^ unknown.length;
  for (let i = 0; i < known.length; ++i) {
    // a |= 5 等价于 a = a|5  1|1=1 1|0=1 0|1=1 0|0=0
    diff |= known.charCodeAt(i) ^ unknown.charCodeAt(i);
  }
  return diff === 0;
}

const en = aesEncrypt('abc123', '123456789789', '123456789');
console.log(en);
// console.log(compareSync('123465', en, '123456', '456'));
