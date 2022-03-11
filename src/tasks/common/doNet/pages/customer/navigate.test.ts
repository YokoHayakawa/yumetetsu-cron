
import {openMockBrowserPage} from '../../../browser';
import {browserTimeOut} from '../../../browser/config';
import customerPage from './navigate';

describe('Customer Page', ()=> {
  it('navigated', async ()=>{
    const page = await openMockBrowserPage();
    const res = await customerPage(page);
    res.browser().disconnect();
    expect(res);
  }, browserTimeOut);
});
