import {openMockBrowserPage} from '../../../browser';
import {browserTimeOut} from '../../../browser/config';
import {setCustForm} from './setCustForm';
import {format, subDays} from 'date-fns';

describe('Statuses', ()=> {
  it('are all unchecked', async ()=>{
    const page = await openMockBrowserPage();
    await setCustForm(page, {
      chkStatus: false,
      dateStr: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    });

    page.browser().disconnect();
    expect(page).toMatchSnapshot();
  }, browserTimeOut);
});
