import {Page, ElementHandle} from 'puppeteer';
import {selectors} from '../../../config';
import {scrollToEl} from '../../../../browser/helpers';
import {
  clickWithReload,
} from '../../../../browser/helpers/actionsWithReload';
import {logger} from '../../../../../../utils';

export const getResultCount = async (page: Page) => {
  await page.waitForSelector(selectors.btnSearch, {visible: true});
  logger.info(`Found the search button `);

  await scrollToEl(
    page, (await page.$(selectors.btnSearch) as ElementHandle));

  await clickWithReload(page, selectors.btnSearch);
  logger.info(`Clicked search button `);

  await Promise.race([
    page.waitForSelector(
      selectors.resultCount, {timeout: 4000, visible: true}).catch(),
    page.waitForSelector(
      selectors.resultNothing, {timeout: 4000, visible: true}).catch(),
  ]);

  const count = await page.$eval(
    selectors.resultCount +
    ' span:first-child', (e) => {
      return (e as unknown as HTMLSpanElement).innerText;
    }).catch(() => 0);
  logger.info(`Search result has ${count} records `);


  return count;
};
