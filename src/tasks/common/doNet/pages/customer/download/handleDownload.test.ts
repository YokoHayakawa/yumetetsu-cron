import {openMockBrowserPage} from '../../../../browser';
import {handleDownload} from './handleDownload';

describe('Download', ()=> {
  it('is successful', async ()=>{
    const page = await openMockBrowserPage();
    const result = await handleDownload(page);

    console.log(`Downloaded lines: ${result.split(/\r\n|\r|\n/).length}`);
    page.browser().disconnect();

    expect(page);
  }, 100000);
});
