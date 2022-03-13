import {APP_IDS} from '../../../api/kintone';
import {browserTimeOut} from '../browser/config';
import {uploadCSV} from './uploadCSV';

describe('Upload CSV', ()=>{
  it('is successfull', async ()=>{
    const page = await uploadCSV(APP_IDS.customers);

    expect(await page.close()).toMatchSnapshot();
  }, browserTimeOut);
});
