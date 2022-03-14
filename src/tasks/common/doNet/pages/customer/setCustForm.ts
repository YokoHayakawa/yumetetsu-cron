import {Page} from 'puppeteer';
import {logger} from '../../../../../utils';
import selectors from './selectors';

interface Options {
  chkStatus : boolean,
  date?: string
}

export const setCustForm = async (
  page: Page,
  options: Options = {chkStatus: false}) => {
  const isChecked = options.chkStatus;

  logger.info('Setting up form.' + isChecked);


  await page.waitForSelector(
    '#m_customer_filters_customer_status_type', {visible: true});
  await page.$$eval(
    selectors.chkStatuses,
    (checks, isChecked) => {
      checks.forEach((c) => {
        (c as HTMLInputElement)
          .checked = isChecked as boolean;
      });
    }, isChecked);
};
