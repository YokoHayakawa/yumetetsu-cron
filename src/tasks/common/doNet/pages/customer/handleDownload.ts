
import {Page} from 'puppeteer';
import fs from 'fs';
import {dumpPath, logger, notifyDev} from '../../../../../utils';
import {custDlDir} from '../../config';
import path from 'path';
import {format} from 'date-fns';
import {APP_IDS} from '../../../../../api/kintone';
import iconv from 'iconv-lite';


/**
 * Programatically download csv data into stream.
 *
 * @param page
 * @return {string} data
 */
export const handleDownload = async (page: Page) => {
  logger.info(`Download path is ${custDlDir}`);
  try {
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
          // eslint-disable-next-line max-len
          const text = decoder.decode(buffer).replace(/([0-5]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])/g, '$1:$2');
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
      iconv.encode(result, 'shift_jis'),

    );
    return result;
  } catch (err: any) {
    notifyDev('Error downloading files' + err.message);
  }
};
