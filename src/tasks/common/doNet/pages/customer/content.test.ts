import {openMockBrowserPage} from '../../../browser';
import {getOptionsEmployee, getOptionsStore} from './content';

describe('Content', ()=>{
  it('retrieved', async ()=>{
    const page = await openMockBrowserPage();
    const storeOptions = await getOptionsStore(page);
    const employeeOptions = await getOptionsEmployee(page);

    page.browser().disconnect();

    expect(storeOptions).toMatchSnapshot();
    expect(employeeOptions).toMatchSnapshot();
  }, 30000);
});
