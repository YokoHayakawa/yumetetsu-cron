import {browserTimeOut} from '../common/browser/config';
import {syncDoNetCust} from './syncDoNetCust';

describe('SyncCust', ()=> {
  it('is successful', async ()=>{
    const page = await syncDoNetCust(true);
    expect(page).toMatchSnapshot();
  }, browserTimeOut);
});
