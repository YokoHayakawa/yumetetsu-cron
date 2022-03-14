import {Page} from 'puppeteer';
import {getSelectOptions} from '../../../browser/helpers/content';
import selectors from './selectors';
import {logger} from '../../../../../utils';

export const getOptionsStore = ( page: Page) => {
  return getSelectOptions(page, selectors.ddStores);
};

export const getOptionsEmployee = (page: Page) => {
  return getSelectOptions(page, selectors.ddAgents);
};


/**
 * Retrieves count.
 * Requires customer screen after search button has been clicked.
 *
 * @export
 * @param {Page} page
 * @return {Promise<number>} s
 */
export async function getResultCount(page: Page): Promise<number> {
  const count = await page.$eval(
    selectors.resultCount +
    ' span:first-child', (e) => {
      return (e as unknown as HTMLSpanElement).innerText;
    }).catch(() => 0);
  logger.info(`Search result has ${count} records `);

  return +count;
}

