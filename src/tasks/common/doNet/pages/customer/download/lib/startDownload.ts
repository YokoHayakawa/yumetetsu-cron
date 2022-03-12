import {Page, ElementHandle} from 'puppeteer';
import {logger} from '../../../../../../../utils';
import {downloadLimit, selectors} from '../../../../config';
import {scrollToEl} from '../../../../../browser/helpers';
import {
  clickWithReload,
} from '../../../../../browser/helpers/actionsWithReload';
import getResultCount from './getResultCount';
import {handleDownload} from './handleDownload';

export const startDownload = async (page: Page) => {
  await page.waitForSelector(selectors.btnSearch, {visible: true});
  logger.info(`Found the search button `);

  await scrollToEl(
    page, (await page.$(selectors.btnSearch) as ElementHandle));

  await clickWithReload(page, selectors.btnSearch);
  logger.info(`Clicked search button `);

  const resultCount = await getResultCount(page);
  logger.info(`Found ${resultCount} `);

  if (resultCount > 0 && resultCount <= downloadLimit) {
    console.log(await handleDownload(page));
  }

  logger.info(`Done downloading store`);


  return page;
};
