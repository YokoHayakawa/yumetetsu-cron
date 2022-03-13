
import {Page} from 'puppeteer';
import path from 'path';
import {logger} from '../../../../../utils';


/**
 * Programatically download csv data into stream.
 *
 * @param page
 * @param handleUpload
 * @return {string} data
 */
export const handleDownload = async (page: Page) => {
  const downloadPath = path.resolve('./dump');
  logger.info(`Download path is ${downloadPath}`);

  const result = await page.evaluate(()=>{
    return fetch('https://manage.do-network.com/customer/ListCsvDownload', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const decoder = new TextDecoder('shift_jis');
        const text = decoder.decode(buffer);

        return text;
      });
  });

  logger.info(
    `Finished file download with ${result.split(/\r\n|\r|\n/).length} lines. `);

  return result;
};
