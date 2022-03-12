import {Page} from 'puppeteer';
import {selectors} from '../../../../config';

export default async (page: Page) => {
  await Promise.race([
    page.waitForSelector(
      selectors.resultCount, {timeout: 4000, visible: true}).catch(),
    page.waitForSelector(
      selectors.resultNothing, {timeout: 4000, visible: true}).catch(),
  ]);

  return await page.$eval(
    selectors.resultCount +
    ' span:first-child', (e) => {
      return (e as unknown as HTMLSpanElement).innerText;
    }).catch(() => 0);
};
