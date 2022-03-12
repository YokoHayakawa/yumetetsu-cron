import {Page} from 'puppeteer';
import {selectors} from '../../config';


/* Must be on homepage after loging in. */
/* export default async (page: Page) => {
  await page.waitForSelector(selectors.loggedInEl);
  await page.click(selectors.custNav);
  return page;
}; */

export const navigateToCustPage = async (page: Page) => {
  await page.waitForSelector(selectors.loggedInEl);
  await page.click(selectors.custNav);
  return page;
};

