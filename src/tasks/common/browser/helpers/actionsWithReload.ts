import {Page} from 'puppeteer';

export const clickWithReload = async (page: Page, selector: string) => {
  return Promise.all([
    page.click(selector),
    page.waitForNavigation({
      waitUntil: 'networkidle0',
    }),
  ]);
};
