import {openMockBrowserPage} from '../../../../../browser';
import {startDownload} from './startDownload';

describe('Dowload', ()=> {
  it('is successful', async ()=>{
    const page = await openMockBrowserPage();
    await startDownload(page);

    page.browser().disconnect();
    expect(page).toBeDefined();
  }, 3000000);
});
