import crypto from 'crypto';

/**
 * AES对称加密函数 aesEncrypt
 * @param data 待加密数据
 * @param key 秘钥
 * @param vi 密钥偏移量
 */
export function aesEncrypt(data: any, key: string, vi: string) {
  crypto.createDecipheriv('aes-256-cbc', key, vi);
}

export function aesDecrypt(encrypted, key, vi) {
  crypto.createDecipheriv('aes-256-cbc', key, vi);
}
