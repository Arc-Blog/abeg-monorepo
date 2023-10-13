// lint-staged文档 https://www.npmjs.com/package/lint-staged
const { ESLint } = require('eslint');

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const ignoredFiles = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));
  const filteredFiles = files.filter((_, i) => !ignoredFiles[i]);
  return filteredFiles.join(' ');
};

module.exports = {
  '*': async (files) => {
    const filesToLint = await removeIgnoredFiles(files); // 被eslint忽略的文件
    // 被lint-stage检测的文件，都执行eslint ${filesToLint} --max-warnings=0命令
    return [`eslint ${filesToLint} --max-warnings=0`];
  },
};