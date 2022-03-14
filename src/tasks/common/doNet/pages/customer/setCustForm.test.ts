import {openMockBrowserPage} from '../../../browser';
import {browserTimeOut} from '../../../browser/config';
import {setCustForm} from './setCustForm';

describe('Statuses', ()=> {
  it('are all unchecked', async ()=>{
    const page = await openMockBrowserPage();
    await setCustForm(page, {chkStatus: false});

    page.browser().disconnect();
    expect(page).toMatchSnapshot();
  }, browserTimeOut);
});
