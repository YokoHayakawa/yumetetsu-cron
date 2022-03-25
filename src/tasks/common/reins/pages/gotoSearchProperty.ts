import {Page} from 'puppeteer';
import {logger} from '../../../../utils';
import {selectors, URLs} from '../config';

export const gotoSearchProperty = async (page: Page) => {
  logger.info('Trying to click search properties button.');
  await page.waitForSelector(selectors.tabs);
  await page.goto(URLs.propertySearchPage);
};
