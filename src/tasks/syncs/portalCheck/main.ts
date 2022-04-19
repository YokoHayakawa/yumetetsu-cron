import {openBrowserPage} from '../../common/browser';

export const main = async () => {
  const firstPage = await openBrowserPage();
  await firstPage.goto('https://suumo.jp/ms/chuko/aichi/city/');
  await firstPage.click('#sa02_sc201');

  await Promise.all([
    firstPage.click('.js-searchBtn'),
    firstPage.waitForNavigation(),
  ]);

  await Promise.all([
    firstPage.click('.ui-icon--tabview'),
    firstPage.waitForNavigation(),
  ]);

  const bukkenmei = await firstPage.$$eval('.property_unit-title_wide',
    (el:any) => el.map((data:any) => data.innerText));
  console.log(bukkenmei);

  await firstPage.waitForTimeout(2000);
  await firstPage.browser().close();
};
