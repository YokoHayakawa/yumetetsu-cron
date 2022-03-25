import {Page} from 'puppeteer';

export const searchProperty = async (page: Page) => {
  const [button] = await page.$x(`//button[contains(., '${'売買 物件検索'}')]`);
  if (button) {
    await button.click();
  }
};
