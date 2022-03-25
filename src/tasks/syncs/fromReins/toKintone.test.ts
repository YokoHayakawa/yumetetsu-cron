import {browserTimeOut} from '../../common/browser/config';
import {toKintone} from './toKintone';

describe('REINS Properties', ()=>{
  it('Synced to kintone', async ()=>{
    const page = await toKintone();

    await page.waitForTimeout(3000);
    await page.close();
    expect(page);
  }, browserTimeOut);
});
