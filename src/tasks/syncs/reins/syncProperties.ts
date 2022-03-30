import {openBrowserPage} from '../../common/browser';
import {login, gotoSearchProperty} from '../../common/reins';
import {scrapeData,
  setFormSearchProperty,
} from '../../common/reins/pages/searchProperty';
import path from 'path';
import {logger, saveCSV} from '../../../utils';
import {uploadSingleCSV} from '../../common/kintone/uploadCSV';
import {Page} from 'puppeteer';
import {APP_IDS} from '../../../api/kintone';
import {formSettings, location} from './formSettings';

const syncData = async (page: Page, result: string) => {
  const filePath = path.join(__dirname, 'dump', 'result.csv');
  await saveCSV(filePath, result);
  await page.bringToFront();
  await uploadSingleCSV(
    page,
    APP_IDS.reins.toString(),
    'propertyId',
    filePath,
  );
};


export const syncProperties = async () => {
  const kintonePage = await openBrowserPage({
    loadImages: false,
    slowMo: 0,
  });
  const reinsPage = await kintonePage.browser()
    .createIncognitoBrowserContext()
    .then((context) => context.newPage());

  await login(reinsPage);

  for (const [pref, cities] of Object.entries(location)) {
    for (const city of cities) {
      for (const formSetting of formSettings) {
        logger.info(`Processing data.${[
          pref, city, formSetting.propertyType,
        ].join(',')}`);

        await gotoSearchProperty(reinsPage);
        await reinsPage.bringToFront();
        await setFormSearchProperty(reinsPage, {
          ...formSetting,
          prefecture: pref,
          city: city,
        });
        const result = await scrapeData(reinsPage);
        if (result) {
          await syncData(kintonePage, result);
        }
      }
    }
  }


  await reinsPage.browser().close();
};
