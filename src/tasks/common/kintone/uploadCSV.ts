import {openBrowserPage} from '../browser';
import {login} from './login';

export const selectors = {
  btnUpload: '#fileKey-browse',
};

export const uploadCSV = async (appId: string) => {
  const page = await openBrowserPage();
  const baseUrl = process.env.KINTONE_BASE_URL;
  const uploadUrl = `${baseUrl}/k/${appId}/importRecord`;

  await page.goto(uploadUrl);

  await Promise.race([

    await login(page),
    await page.waitForSelector(selectors.btnUpload),
  ]);

  return page;
};
