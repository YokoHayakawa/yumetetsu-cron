
import {Page} from 'puppeteer';
import fs from 'fs';
import {dumpPath, logger} from '../../../../../utils';
import {custDlDir} from '../../config';
import path from 'path';
import {format} from 'date-fns';
import {APP_IDS} from '../../../../../api/kintone';


/**
 * Programatically download csv data into stream.
 *
 * @param page
 * @param handleUpload
 * @return {string} data
 */
export const handleDownload = async (page: Page) => {
  logger.info(`Download path is ${custDlDir}`);

  const result = await page.evaluate(()=>{
    return fetch('https://manage.do-network.com/customer/ListCsvDownload', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        return res.arrayBuffer();
      })
      .then((buffer) => {
        const decoder = new TextDecoder('shift_jis');
        const text = decoder.decode(buffer);
        return text;
      });
  });


  logger.info(
    // eslint-disable-next-line max-len
    `Finished file download with ${result?.split(/\r\n|\r|\n/).length || 0} lines. `,
  );

  fs.writeFileSync(
    path.join(
      dumpPath,
      format(new Date(), `${APP_IDS.customers}-yyyyMMdd-HHmmss`),
    ) + '.csv',
    result,

  );
  return result;
};
