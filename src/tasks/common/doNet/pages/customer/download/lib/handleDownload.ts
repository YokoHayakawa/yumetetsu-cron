import {selectors} from '../../../../config';
import {Page} from 'puppeteer';
import path from 'path';
import {logger} from '../../../../../../../utils';


export const handleDownload = async (page: Page) => {
  const downloadPath = path.resolve('./dump');
  logger.info(`Download path is ${downloadPath}`);

  const res = await page.evaluate(()=>{
    return fetch('https://manage.do-network.com/customer/ListCsvDownload', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.text())
      .then((res) => {
        console.log('Success', res );
        return res;
      });
  });

  console.log(res, 'hello');

  return res;
};
