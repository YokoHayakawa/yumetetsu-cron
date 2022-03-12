import {kintoneClient} from '.';

import {exec, execSync} from 'child_process';
import iconv from 'iconv-lite';
import {decodeToSJIS} from '../../utils/text';


export const uploadAll = (appId: string, records : Records) => {
  return kintoneClient.record.addAllRecords({
    app: appId,
    records,
  });
};


export const uploadAllByCLI = async () => {
  const path = process.env.CLI_KINTONE_PATH;
  try {
    const result = execSync(
      `${path} -help`,
    );
    return decodeToSJIS(result);
  } catch (error: any) {
    console.log(error.message);
    return `error: ${error?.stdout?.toString()}`;
  }
};

