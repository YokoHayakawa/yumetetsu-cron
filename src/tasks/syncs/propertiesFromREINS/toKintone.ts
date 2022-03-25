import {openBrowserPage} from '../../common/browser';
import {login} from '../../common/reins';

export const toKintone = async () => {
  const page = await openBrowserPage(false);
  await login(page);
};
