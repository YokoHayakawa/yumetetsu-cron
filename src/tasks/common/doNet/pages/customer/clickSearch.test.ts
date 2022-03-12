import {openMockBrowserPage} from '../../../browser';
import {clickSearch} from './clickSearch';

describe('Result Count', ()=>{
  it('is counted.', async () => {
    const page = await openMockBrowserPage();
    const count = await clickSearch(page);
    console.log(count);

    page.browser().disconnect();
    expect(count).toBeDefined();
  });
});
