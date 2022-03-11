import {launchBrowser} from './openBrowser';

describe('Browser', () => {
  it('is opened.', async ()=> {
    const browser = await launchBrowser();
    setTimeout(() => browser.close(), 2000);
    expect(browser);
  });
});
