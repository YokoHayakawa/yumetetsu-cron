import {browserTimeOut} from '../../common/browser/config';
import {syncProperties} from './syncProperties';

describe('REINS Properties', ()=>{
  it('Synced to kintone', async ()=>{
    await syncProperties();
  }, browserTimeOut);
});
