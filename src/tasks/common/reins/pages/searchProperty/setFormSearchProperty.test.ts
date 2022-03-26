import {openMockBrowserPage} from '../../../browser';
import {browserTimeOut} from '../../../browser/config';
import {setFormSearchProperty} from './setFormSearchProperty';

describe('Form', ()=>{
  it('is successfuly set', async ()=>{
    const page = await openMockBrowserPage();
    await setFormSearchProperty(
      page,
      {
        propertyType: '売マンション',
      },
    );
    page.browser().disconnect();

    expect(page);
  }, browserTimeOut);
});
