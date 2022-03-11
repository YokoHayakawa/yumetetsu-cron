import {Page} from 'puppeteer';
import {logger} from '../../../../../../../utils';
import {selectors} from '../../../../config';

export const startDownload = async (page: Page) => {
  logger.info('Starting to download.');
  await page.waitForSelector(selectors.btnSearch);
  await Promise.all([
    page.waitForNavigation({waitUntil: 'networkidle2'}),
    page.click(selectors.btnSearch),
  ]);

  return page;
};
