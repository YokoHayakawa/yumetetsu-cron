import {Page} from 'puppeteer';
import {logger} from '../../../../utils';
import {URLs} from '../config';

export const gotoSearchProperty = async (page: Page) => {
  logger.info('Trying to click search properties button.');
  await page.waitForNetworkIdle();
  await page.goto(URLs.propertySearchPage);
};
