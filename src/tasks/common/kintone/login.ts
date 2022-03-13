import {Page} from 'puppeteer';
import {logger} from '../../../utils';
import {clear} from '../../../utils/field';
import {URLs} from './config';

const selectors = {
  user: '[name="username"]',
  pass: '[name="password"]',
  btnLogin: '.login-button',
};

export const login = async (page: Page) => {
  await page.waitForSelector(selectors.btnLogin);

  logger.info('Navigating to kintone login.');
  await page.goto(URLs.login);

  logger.info('Typing credentials');
  await clear(page, selectors.user);
  await page.type(selectors.user, process.env.KINTONE_USER);

  await clear(page, selectors.pass);
  await page.type(selectors.pass, process.env.KINTONE_PASS);

  logger.info('Pressing enter to confirm login.');
  await page.keyboard.type('\n');
};
