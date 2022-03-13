import {openMockBrowserPage} from '../../../browser';
import {browserTimeOut} from '../../../browser/config';
import {handleDownload} from './handleDownload';

describe('Download', ()=> {
  it('is successful', async ()=>{
    const page = await openMockBrowserPage();
    const result = await handleDownload(page);

    page.browser().disconnect();

    expect(result).toMatchSnapshot();
  }, browserTimeOut);
});
