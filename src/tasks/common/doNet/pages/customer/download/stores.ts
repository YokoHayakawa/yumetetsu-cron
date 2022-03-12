import {Page} from 'puppeteer';
import {logger} from '../../../../../../utils';
import {downloadLimit, selectors} from '../../../config';
import {getOptionsStore} from '../content';
import {getResultCount} from './getResultCount';
import {handleDownload} from './handleDownload';

export const downloadPerStore = async (page: Page) => {
  const stores = await getOptionsStore(page);

  for (const store of stores) {
    logger.info(`Selected store - ${store.text} `);
    await page.select(selectors.ddStores, store.value);
    const resultCount = await getResultCount(page);
    if (resultCount > 0 ) {
      if (resultCount <= downloadLimit) {
        await handleDownload(page);
      }
    }
  }
  return page;
};

