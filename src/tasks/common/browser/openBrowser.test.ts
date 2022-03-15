import {browserTimeOut} from './config';
import {launchBrowser} from './openBrowser';

describe('Browser', () => {
  it('is opened.', async ()=> {
    const browser = await launchBrowser();
    await browser.close();
    expect(browser);
  }, browserTimeOut);
});
