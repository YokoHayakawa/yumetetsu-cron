import {Page} from 'puppeteer';
import {logger} from '../../../../../../utils';
import {selectors} from '../../../config';
// import {startDownload} from './helpers/startDownload';

export const getStores = async (page : Page) => {
  console.log('aruss?', selectors.shopDD);
  await page.waitForSelector(selectors.shopDD);

  return page.$$eval(
    selectors.shopDD + ' > option', (options) => {
      return (options as unknown as HTMLOptionElement[]).map(
        (option) => ({value: option.value, text: option.textContent}),
      );
    },
  );
};

export const perStore = async (page: Page) => {
  const stores = (await getStores(page))
    .filter((store) => store.text?.length);

  for (const store of stores) {
    logger.info(`Selected store - ${store.text} `);

    await page.select(selectors.shopDD, store.value);
    await page.waitForSelector(selectors.btnSearch);
    const res = await Promise.allSettled([
      page.waitForNetworkIdle(),
      page.click(selectors.btnSearch),
    ]);

    console.log(res);

    await page.waitForSelector(`option[value="${store.value}"]`);
    console.log(await page.title());
    logger.info(`Done downloading store - ${store.text} `);
  }

  return page;
};
