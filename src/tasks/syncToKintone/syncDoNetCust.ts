import {openBrowserPage} from '../common/browser';
import {login} from '../common/doNet/login';
import {navigateToCustPage} from '../common/doNet/pages/navigate';
import {
  downloadPerStore,
} from '../common/doNet/pages/customer/downloadPerStore';
import {setCustForm} from '../common/doNet/pages/customer/setCustForm';
import {uploadCSV} from '../common/kintone/uploadCSV';
import {APP_IDS} from '../../api/kintone';


export const syncDoNetCust = async () => {
  const page = await openBrowserPage();

  await login(page);
  await navigateToCustPage(page);
  await setCustForm(page);
  await downloadPerStore(page);
  await uploadCSV(page, APP_IDS.customers, 'custId');

  await page.close();
};
