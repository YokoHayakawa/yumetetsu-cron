import {openMockBrowserPage} from '../../../browser';
import {scrapeData} from './scrapeData';

describe('Data Scraped', ()=>{
  it('is successful', async ()=>{
    const page = await openMockBrowserPage();

    const result = await scrapeData(page);

    page.browser().disconnect();

    expect(result).toMatchSnapshot();
  });
});
