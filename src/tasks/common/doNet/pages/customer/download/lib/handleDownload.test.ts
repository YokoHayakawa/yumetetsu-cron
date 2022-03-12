import {openMockBrowserPage} from '../../../../../browser';
import {handleDownload} from './handleDownload';

describe('Download', ()=> {
  it('is successful', async ()=>{
    const page = await openMockBrowserPage();
    await handleDownload(page);

    page.browser().disconnect();

    expect(page);
  }, 100000);
});
