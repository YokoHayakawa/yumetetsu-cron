import fs from 'fs';
import {logger} from './logger';
import path from 'path';
import {dumpPath} from './paths';

/**
 *
 * Fix datetime of provided fields to match kintone format.
 *
 * Kintone format: yyyy-MM-dd HH:mm
 * @param path file path.
 * @param fields fields to fix
 * @todo
 * Lost the need of it as regex seems to be more intuitive than
 * converting csv to dataframe first.
 */
export const fixCSVDateTime = (path: string, fields: string[]) => {
  console.log(path, fields);
};


export const getCSVFiles = (dir: string, appId: string) => {
  const result = fs.readdirSync(dir)
    .filter((file) => {
      return file.split('.')[1] === 'csv' && file.split('-')[0] === appId;
    }).map((fileName) => path.join(dumpPath, fileName));

  logger.info(`Found ${result.length} csv files`);
  return result;
};
