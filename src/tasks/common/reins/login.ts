import {Page} from 'puppeteer';
import {logger} from '../../../utils/logger';

import {URLs, selectors} from './config';

const goToLoginPage = async (page: Page) => {
  await page.goto(URLs.login, {waitUntil: 'networkidle2'});
  await page.waitForSelector(selectors.btnLogin);
  await page.click(selectors.btnLogin);
  return page;
};

const typeCredentials = async (page: Page) => {
  const user = process.env.REINS_USER;
  const pass = process.env.REINS_PASS;

  if (!(user && pass)) {
    throw new Error('Please define REINS credentials at .env file');
  }
  await page.waitForSelector(selectors.txtUser, {visible: true});
  await page.type(selectors.txtUser, user);
  await page.type(selectors.txtPass, pass);
  await page.click(selectors.chkLogin);
  await page.click('button');
};


export const login = async (page: Page ) => {
  logger.info('Started login to REINS. ');
  await goToLoginPage(page);
  await typeCredentials(page);
};
