import {APP_IDS} from '../../../api/kintone';
import {openMockBrowserPage} from '../browser';
import {browserTimeOut} from '../browser/config';
import {attachFile, selectEncoding, uploadCSV} from './uploadCSV';

describe('CSV', ()=>{
  it('is attached', async ()=> {
    const page = await openMockBrowserPage();
    await attachFile(page, 'test.csv');

    page.browser().disconnect();
  });

  it('is uploaded', async ()=>{
    const page = await uploadCSV(APP_IDS.customers, '顧客番号');
    await page.waitForTimeout(5000);

    expect(await page.close()).toMatchSnapshot();
  }, browserTimeOut);
});

describe('Encoding', ()=>{
  it('has been selected', async ()=> {
    const page = await openMockBrowserPage();
    await selectEncoding(page);

    page.browser().disconnect();
  });
});
