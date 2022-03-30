import {browserTimeOut} from '../../common/browser/config';
import {toKintone} from './toKintone';

describe('REINS Properties', ()=>{
  it('Synced to kintone', async ()=>{
    await toKintone();
  }, browserTimeOut);
});
