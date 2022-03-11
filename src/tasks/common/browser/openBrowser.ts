import puppeteer from 'puppeteer';
import {logger} from '../../../utils';
import {optionsTest} from './config';

const isTest = process.env.NODE_ENV === 'test';

const options = isTest ? optionsTest() : undefined;

export const launchBrowser = () => {
  logger.info('Launching browser.');
  return puppeteer.launch(options);
};

export const openBrowserPage = async () => {
  logger.info('Opening page.');
  const browser = await launchBrowser();
  const pages = await browser.pages();
  if (pages.length !== 0) {
    return pages[0];
  } else {
    return browser.newPage();
  }
};
