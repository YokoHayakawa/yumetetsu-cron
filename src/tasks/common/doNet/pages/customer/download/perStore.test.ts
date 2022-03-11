import {openMockBrowserPage} from '../../../../browser';
import {browserTimeOut} from '../../../../browser/config';
import {getStores, perStore} from './perStore';


describe('Stores', () => {
  it('are retrieved', async ()=>{
    const page = await openMockBrowserPage();
    const stores = await getStores(page);

    console.log(stores, 'stores');
    page.browser().disconnect();

    expect(stores).toBeDefined();
  }, browserTimeOut);

  it('are downloaded', async () => {
    const page = await openMockBrowserPage();
    const res = await perStore(page);

    page.browser().disconnect();
    expect(res);
  }, browserTimeOut);
});
