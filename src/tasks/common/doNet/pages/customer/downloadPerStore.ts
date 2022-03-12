import {Page} from 'puppeteer';
import {logger} from '../../../../../utils';
import {downloadLimit, selectors} from '../../config';
import {getOptionsStore} from './content';
import {clickSearch} from './clickSearch';
import {handleDownload} from './handleDownload';
import {downloadPerAgent} from './downloadPerAgent';

export const downloadPerStore = async (page: Page) => {
  logger.info(`Started downloading per store`);
  const stores = await getOptionsStore(page);

  for (const store of stores) {
    logger.info(`Selected store - ${store.text} `);
    await page.select(selectors.ddStores, store.value);
    const resultCount = await clickSearch(page);
    if (resultCount > 0 ) {
      if (resultCount <= downloadLimit) {
        await handleDownload(page);
      } else {
        await downloadPerAgent(page);
      }
    }
  }
  return page;
};

