import puppeteer, {Browser} from 'puppeteer';
import {logger} from '../../../utils';
import {optionsTest, browserURL} from './config';

const isTest = process.env.NODE_ENV === 'test';

const options = isTest ? optionsTest() : undefined;

const getPage = async (browser: Browser) => {
  const pages = await browser.pages();
  return pages.length > 0 ? pages[0] : browser.newPage();
};

export const launchBrowser = () => {
  logger.info('Launching browser.');
  return puppeteer.launch(options);
};

export const openBrowserPage = async () => {
  logger.info('Opening page.');
  const browser = await launchBrowser();
  return getPage(browser);
};

/**
 * For testing
 *
 * @return {Promise<puppeteer.Page>} Page
 */
export const openMockBrowserPage = async () => {
  logger.info('Opening mock browser page.');
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    // browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser/87ef8a6a-0405-4c36-821f-309ad007f026',
    defaultViewport: null});
  return getPage(browser);
};
