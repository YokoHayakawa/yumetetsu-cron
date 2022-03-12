import {openMockBrowserPage} from '../../../../browser';
import {browserTimeOut} from '../../../../browser/config';
import {downloadPerStore} from './stores';


describe('Stores', () => {
  it('are downloaded', async () => {
    const page = await openMockBrowserPage();
    const res = await downloadPerStore(page);

    page.browser().disconnect();
    expect(res);
  }, browserTimeOut);
});
