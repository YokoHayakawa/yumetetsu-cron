import {APP_IDS} from '../../../api/kintone';
import {openMockBrowserPage} from '../browser';
import {browserTimeOut} from '../browser/config';
import {attachFile, uploadCSV} from './uploadCSV';

describe('CSV', ()=>{
  it('is attached', async ()=> {
    const page = await openMockBrowserPage();
    await attachFile(page, 'test.csv');

    page.browser().disconnect();
  });
});

describe('Upload', ()=>{
  it('is done.', async ()=>{
    const page = await uploadCSV(APP_IDS.customers, '顧客番号');
    await page.waitForTimeout(5000);

    expect(await page.close()).toMatchSnapshot();
  }, browserTimeOut);
});

