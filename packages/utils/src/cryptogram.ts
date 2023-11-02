import * as CryptoJS from 'crypto-js';
// AES 128 位密钥可以表示为 32 个字符的十六进制字符串。将需要 24 个 base64 字符。
// AES 256 位密钥可以表示为 64 个字符的十六进制字符串。将需要 44 个 base64 字符。

// 十六位十六进制数作为密钥
// const SECRET_KEY = CryptoJS.enc.Utf8.parse('1234123412341234');
// console.log(SECRET_KEY);
// 十六位十六进制数作为密钥偏移量
// const SECRET_IV = CryptoJS.enc.Utf8.parse('1234123412341234');

function secretKeyVi(key: string) {
  return CryptoJS.enc.Utf8.parse(key);
}

/**
 * 加密方法
 * @param data
 * @returns {string}
 */
export function aesEncrypt(data, key, vi) {
  const SECRET_KEY = secretKeyVi(key);
  const SECRET_IV = secretKeyVi(vi);
  if (typeof data === 'object') {
    try {
      // eslint-disable-next-line no-param-reassign
      data = JSON.stringify(data);
    } catch (error) {
      console.log('encrypt error:', error);
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
}

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
export function aesDecrypt(data, key, vi) {
  const SECRET_KEY = secretKeyVi(key);
  const SECRET_IV = secretKeyVi(vi);

  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

export function compareSync(s: string, encrypted: string, key: string, vi: string) {
  const SECRET_KEY = secretKeyVi(key);
  const SECRET_IV = secretKeyVi(vi);
  if (typeof s !== 'string' || typeof encrypted !== 'string')
    throw Error('Illegal arguments: ' + typeof s + ', ' + typeof encrypted);
  return safeStringCompare(s, aesDecrypt(encrypted, SECRET_KEY, SECRET_IV));
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
