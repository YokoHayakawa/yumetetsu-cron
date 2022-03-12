import {openBrowserPage} from '../common/browser';
import {login} from '../common/doNet/login';
import {navigateToCustPage} from '../common/doNet/pages/customer/navigate';
import {
  downloadPerStore,
} from '../common/doNet/pages/customer/downloadPerStore';


export const syncDoNetCust = async () => {
  const page = await openBrowserPage();

  await login(page);
  await navigateToCustPage(page);
  await downloadPerStore(page);

  await page.close();
};
