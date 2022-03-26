import {Page} from 'puppeteer';
import {logger} from '../../../../utils';
import {URLs} from '../config';

export const gotoSearchProperty = async (page: Page) => {
  logger.info('Trying to click search properties button.');
  await page.waitForXPath('//button[text()="売買 物件検索"]', {visible: true});
  await page.goto(URLs.propertySearchPage);
};
