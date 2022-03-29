import {openMockBrowserPage} from '../../../browser';
import {getContent} from './getContent';

describe('Data', ()=>{
  it('scraped', async ()=>{
    const page = await openMockBrowserPage();

    const result = await getContent(page);

    await page.browser().disconnect();

    expect(result).toMatchSnapshot();
  });
});
