import {Page} from 'puppeteer';
import {getSelectOptions} from '../../../browser/helpers/content';
import {selectors} from '../../config';

export const getOptionsStore = ( page: Page) => {
  return getSelectOptions(page, selectors.ddEmployees);
};

export const getOptionsEmployee = (page: Page) => {
  return getSelectOptions(page, selectors.ddEmployees);
};
