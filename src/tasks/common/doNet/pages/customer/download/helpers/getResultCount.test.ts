import {openMockBrowserPage} from '../../../../../browser';
import getResultCount from './getResultCount';

describe('Result Count', ()=>{
  it('is counted.', async () => {
    const page = await openMockBrowserPage();
    const count = await getResultCount(page);
    console.log(count);

    page.browser().disconnect();
    expect(count).toBeDefined();
  });
});
