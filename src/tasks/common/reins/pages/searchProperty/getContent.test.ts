import {openMockBrowserPage} from '../../../browser';
import {getBody, getContent, getHeader} from './getContent';

describe('Data', ()=>{
  it('scraped', async ()=>{
    const page = await openMockBrowserPage();
    const result = await getContent(page);

    await page.browser().disconnect();

    expect(result).toMatchSnapshot();
  });

  it('retrieved header', async ()=>{
    const page = await openMockBrowserPage();
    const result = await getHeader(page);
    await page.browser().disconnect();

    expect(result).toMatchSnapshot();
  });

  it('retrieved body', async ()=>{
    const page = await openMockBrowserPage();
    const result = await getBody(page);
    page.browser().disconnect();

    expect(result).toMatchSnapshot();
  });
});
