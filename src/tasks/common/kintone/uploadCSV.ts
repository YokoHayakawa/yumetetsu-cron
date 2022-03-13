import {dumpPath, getCSVFiles, logger} from '../../../utils';

import {openBrowserPage} from '../browser';
import {login} from './login';
import path from 'path';
import {Page} from 'puppeteer';


export const selectors = {
  btnUploadFile: '#fileKey-browse',
  btnImport: 'import-uploadForm-gaia',
  headerYes: '.input-radio-item-cybozu > input',
};

export const selectEncoding = async (page: Page) => {
  logger.info(`Selecting encoding.`);
  await page.click('#importFileCharset-gaia');
};

export const goToImportPage = async (page: Page, appId: string) => {
  const baseUrl = process.env.KINTONE_BASE_URL;
  const uploadUrl = `${baseUrl}/k/${appId}/importRecord`;

  logger.info(`Navigating to upload page for ${appId}`);
  await page.goto(uploadUrl);
  await Promise.race([
    await login(page),
    await page.waitForSelector(selectors.btnUploadFile),
  ]);

  logger.info(`Successfully navigated to ${appId}`);
};

export const attachFile = async (page: Page, fileName: string) => {
  logger.info(`Attaching ${fileName}`);
  const filePath = path.join(dumpPath, fileName);
  const inputUploadHandle = await page.$('input[type=file]');
  await inputUploadHandle?.uploadFile(filePath);
  await page.click(selectors.headerYes);
};

export const handleUpload = async (
  page: Page, keyField: string,
) => {
  logger.info(`Toggling key ${keyField}`);
  await page.waitForSelector(`input[id^='${keyField}']`);
  await page.click(`input[id^='${keyField}']`);

  logger.info(`Start upload.`);
  await page.click(selectors.btnImport);
};


/**
 * Uploads all processed csv.
 *
 * @param {string} appId
 * @param {string} [keyField='レコード番号']
 * @return {*} page
 */
export const uploadCSV = async (appId: string, keyField = 'レコード番号') => {
  const page = await openBrowserPage();

  logger.info(`Starting upload to kintone for ${appId}.`);
  const files = getCSVFiles(dumpPath, appId);
  for (const file of files) {
    await goToImportPage(page, appId);
    await attachFile(page, file);
    await handleUpload(page, keyField);
  }

  return page;
};
