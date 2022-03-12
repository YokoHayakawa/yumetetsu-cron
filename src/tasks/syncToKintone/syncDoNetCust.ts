import {openBrowserPage} from '../common/browser';
import {
  login,
  downloadPerStore,
  navigateToCustPage,
} from '../common/doNet';


export const syncDoNetCust = async () => {
  const page = await openBrowserPage();

  await login(page);
  await navigateToCustPage(page);
  await downloadPerStore(page);

  await page.close();
};
