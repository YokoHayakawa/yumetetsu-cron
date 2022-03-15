import fs from 'fs';


/**
 * Fix datetime of provided fields to match kintone format.
 * Kintone format: yyyy-MM-dd HH:mm
 * @param path file path.
 * @param fields fields to fix
 */
export const fixCSVDateTime = (path: string, fields: string[]) => {
  console.log(path, fields);
};
