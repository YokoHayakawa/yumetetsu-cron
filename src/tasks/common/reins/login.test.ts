import {openBrowserPage} from '../browser';
import {browserTimeOut} from '../browser/config';
import {login} from './login';

describe('login', () => {
  it('is successfull', async ()=> {
    const page = await openBrowserPage(false);
    await login(page);

    await page.waitForTimeout(5000);

    await page.close();

    expect(page);
  }, browserTimeOut);
});
