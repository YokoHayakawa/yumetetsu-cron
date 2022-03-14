import {dumpPath, getCSVFiles, logger} from '../../../utils';

import {openBrowserPage} from '../browser';
import {login} from './login';
import path from 'path';
import {Page} from 'puppeteer';


export const selectors = {
  inputFile: 'input[type=file]',
  btnUploadFile: '#fileKey-browse',
  btnImport: '#import-uploadForm-gaia:not([disabled])',
  headerYes: '.input-radio-item-cybozu > input',
};


export const goToImportPage = async (page: Page, appId: string) => {
  const baseUrl = process.env.KINTONE_BASE_URL;
  const uploadUrl = `${baseUrl}/k/${appId}/importRecord`;

  logger.info(`Navigating to upload page for ${appId}`);

  await page.goto(uploadUrl);

  await Promise.race([
    login(page).catch(),
    page.waitForSelector(
      '.button-submit-cybozu.button-disabled-cybozu').catch(),
  ]);

  logger.info(`Successfully navigated to ${appId}`);
};

export const attachFile = async (page: Page, fileName: string) => {
  logger.info(`Attaching ${fileName}`);
  const filePath = path.join(dumpPath, fileName);
  await page.waitForSelector(selectors.inputFile);
  const inputUploadHandle = await page.$(selectors.inputFile);

  await inputUploadHandle?.uploadFile(filePath);

  logger.info(`Attempting to click yes.`);
  await page.waitForSelector(selectors.headerYes, {visible: true});
  await page.click(selectors.headerYes);
  logger.info(`Succesfully to clicked yes.`);
};

export const handleUpload = async (
  page: Page, keyField: string,
) => {
  logger.info(`Toggling key ${keyField}`);
  await page.waitForNetworkIdle();
  await page.waitForSelector(`input[id^='${keyField}']`, {visible: true});
  await page.click(`input[id^='${keyField}']`);

  logger.info(`Start upload.`);
  await page.waitForSelector(selectors.btnImport);
  await page.click(selectors.btnImport);
};


/**
 * Uploads all processed csv.
 *
 * @param {Page} page
 * @param {string} appId
 * @param {string} [keyField='レコード番号']
 * @return {*} page
 */
export const uploadCSV = async (
  page: Page, appId: string, keyField = 'レコード番号',
) => {
  // const page = await openBrowserPage();

  logger.info(`Starting upload to kintone for ${appId}.`);
  const files = getCSVFiles(dumpPath, appId);
  for (const file of files) {
    await goToImportPage(page, appId);
    await attachFile(page, file);
    await handleUpload(page, keyField);
  }

  return page;
};
