import {browserTimeOut} from './config';
import {launchBrowser} from './openBrowser';

describe('Browser', () => {
  it('is opened.', async ()=> {
    const browser = await launchBrowser({slowMo: 0});
    await browser.close();
    expect(browser);
  }, browserTimeOut);
});
