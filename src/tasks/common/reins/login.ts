import {Page} from 'puppeteer';
import {logger} from '../../../utils/logger';

import {URLs, selectors} from './config';
const {login: loginSel} = selectors;

const goToLoginPage = async (page: Page) => {
  await page.goto(URLs.login, {waitUntil: 'networkidle2'});
  await page.waitForSelector(loginSel.btnLogin);
  await page.click(loginSel.btnLogin);
  return page;
};

const typeCredentials = async (page: Page) => {
  const user = process.env.REINS_USER;
  const pass = process.env.REINS_PASS;

  if (!(user && pass)) {
    throw new Error('Please define REINS credentials at .env file');
  }
  await page.waitForSelector(loginSel.txtUser, {visible: true});
  await page.type(loginSel.txtUser, user);
  await page.type(loginSel.txtPass, pass);
  await page.click(loginSel.chkLogin);
  await page.click('button');
};


export const login = async (page: Page ) => {
  logger.info('Started login to REINS. ');
  await goToLoginPage(page);

  await typeCredentials(page);
};
