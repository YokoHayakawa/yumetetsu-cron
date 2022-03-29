import {openBrowserPage} from '../../common/browser';
import {login, gotoSearchProperty} from '../../common/reins';
import {
  setFormSearchProperty,
} from '../../common/reins/pages/searchProperty/setFormSearchProperty';

export const toKintone = async () => {
  const page = await openBrowserPage({
    loadImages: false,
    slowMo: 20,
  });
  await login(page);
  await gotoSearchProperty(page);
  await setFormSearchProperty(page, {
    propertyType: '売一戸建',
  });

  return page;
};
