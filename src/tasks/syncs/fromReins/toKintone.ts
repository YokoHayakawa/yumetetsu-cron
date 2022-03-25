import {openBrowserPage} from '../../common/browser';
import {login, gotoSearchProperty} from '../../common/reins';

export const toKintone = async () => {
  const page = await openBrowserPage(false);
  await login(page);
  await gotoSearchProperty(page);
  return page;
};
