import {openMockBrowserPage} from '../../../browser';
import {browserTimeOut} from '../../../browser/config';
import {downloadPerAgent} from './downloadPerAgent';


describe('Agents', () => {
  it('are downloaded', async () => {
    const page = await openMockBrowserPage();
    const res = await downloadPerAgent(page);

    page.browser().disconnect();
    expect(res).toMatchSnapshot();
  }, browserTimeOut);
});
