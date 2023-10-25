import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import { join } from 'path';
import file from './uploadfile.conf';

const envPath = join(
  __dirname,
  '../config',
  `${process.env.NODE_ENV || 'development'}.config.yaml`,
);

const envConfig = yaml.load(readFileSync(envPath, 'utf8'));
export default () => {
  return _.merge(envConfig, file) as Record<string, any>;
};
