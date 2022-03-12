
import {openMockBrowserPage} from '../browser';
import {login} from './login';

describe('DoNet', ()=>{
  it('login successfully', async ()=>{
    const page = await openMockBrowserPage();
    await login(page);

    page.browser().disconnect();

    expect(page).toBeDefined();
  }, 30000);
});
