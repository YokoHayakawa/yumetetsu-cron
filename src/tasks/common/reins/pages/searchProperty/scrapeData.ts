/* eslint-disable max-len */
import {Page} from 'puppeteer';
import {getBody, getHeader} from './getContent';

const paginationElement = async (page: Page) => {
  return page.$x('//ul[contains(@class,"pagination")]');
};

const getNextButton = async (page: Page) => {
  return paginationElement(page)
    .then(([pagination]) => pagination.$x('li[last()]/button'))
    .then(([nextButton]) => nextButton);
};

const isLastPage = async (page: Page) => {
  return paginationElement(page)
    .then(([pagination]) => pagination.$x('li[last()]'))
    .then(([nextButton]) => nextButton.getProperty('className') )
    .then((cn)=> cn.toString().includes('disabled'));
};


export const scrapeData = async (page: Page) =>{
  const isWithRecord = await Promise.race([
    page.waitForXPath('//div[contains(text(),"検索結果")]').then(()=>false),
    page.waitForXPath('//ul[contains(@class,"pagination")]').then(()=> true),
  ]);

  if (!isWithRecord) return;

  const scrapedData = [await getHeader(page)];
  console.log(scrapedData);

  scrapedData.push(await getBody(page));

  while (!(await isLastPage(page))) {
    const nextButton = await getNextButton(page);
    await nextButton.click();
    await page.waitForNetworkIdle({idleTime: 100});
    scrapedData.push(await getBody(page));
  }

  return scrapedData.join('\n');
};
