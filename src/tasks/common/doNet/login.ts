import {Page} from 'puppeteer';
import {logger} from '../../../utils';
import {openBrowserPage} from '../browser/openBrowser';
import {URLs, selectors} from './config';

export const login = async (page: Page ) => {
  logger.info('Started login to doNetwork. ');
  // const page = (currPage || await openBrowserPage());

  console.log(process.env.DO_NETWORK_USER, 'user');
  await page.goto(URLs['login'], {waitUntil: 'domcontentloaded'});

  await page.waitForSelector(selectors.user);
  await page.select(selectors.store, '157');
  await page.type(selectors.user, process.env.DO_NETWORK_USER);
  await page.type(selectors.pass, process.env.DO_NETWORK_PASSWORD);
  await page.click(selectors.login);
  await page.waitForSelector(selectors.loggedInEl);

  return page;
};
