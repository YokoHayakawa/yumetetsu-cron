import {Page} from 'puppeteer';
import {logger} from '../../../../../utils';
import {downloadLimit} from '../../config';
import {getOptionsStore} from './content';
import {clickSearch} from './clickSearch';
import {handleDownload} from './handleDownload';
import {downloadPerAgent} from './downloadPerAgent';
import selectors from './selectors';
import {openBrowserPage} from '../../../browser';
import {navigateToCustPage} from '../navigate';
import {login} from '../../login';
import {setCustForm} from './setCustForm';


export const downloadPerStore = async (
  page: Page,
) => {
  logger.info(`Started downloading per store`);
  const stores = await getOptionsStore(page);

  for (const store of stores) {
    logger.info(`Selected store - ${store.text} `);

    /*
    Donetwork is limiting automation via the instance of the browser.
    I could have cleared cookies and other credentials but
    Reinstate entirely new browser seem to be quicker solution.
     */
    const newPage = await openBrowserPage();
    await login(newPage);
    await navigateToCustPage(newPage);
    await setCustForm(newPage);

    /* Select store */
    await newPage.waitForSelector(selectors.ddStores);
    await newPage.select(selectors.ddStores, store.value);

    const resultCount = await clickSearch(newPage);
    if (resultCount > 0 ) {
      if (resultCount <= downloadLimit) {
        await handleDownload(newPage);
      } else {
        await downloadPerAgent(newPage);
      }
    }
    await newPage.close();
  }
  return page;
};

