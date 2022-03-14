import appRoot from 'app-root-path';
import fs from 'fs';
import path from 'path';
import {logger} from './logger';

export const rootPath = appRoot;
export const dumpPath = appRoot.resolve('dump');
export const archivePath = path.join(dumpPath, 'archive');


export {custDlDir} from '../tasks/common/doNet/config';

export const getCSVFiles = (dir: string, appId: string) => {
  const result = fs.readdirSync(dir)
    .filter((file) => {
      return file.split('.')[1] === 'csv' && file.split('-')[0] === appId;
    }).map((fileName) => path.join(dumpPath, fileName));

  logger.info(`Found ${result.length} csv files`);
  return result;
};
