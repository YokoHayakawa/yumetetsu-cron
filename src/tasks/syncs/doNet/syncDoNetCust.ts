import {openBrowserPage} from '../../common/browser';
import {login} from '../../common/doNet/login';
import {navigateToCustPage} from '../../common/doNet/pages/navigate';
import {
  downloadPerStore, selectStoreThenSearch,
} from '../../common/doNet/pages/customer/downloadPerStore';
import {uploadSingleCSV} from '../../common/kintone/uploadCSV';
import {APP_IDS} from '../../../api/kintone';
import chokidar from 'chokidar';
import {deleteFile, dumpPath, logger, notifyDev} from '../../../utils';
import {setCustForm} from '../../common/doNet/pages/customer/setCustForm';

import {format, subDays} from 'date-fns';
import {handleDownload} from '../../common/doNet/pages/customer/handleDownload';
import {Browser} from 'puppeteer';


export const handleFileWatcher = async (path: string, browser: Browser) => {
  try {
    const context = await browser.createIncognitoBrowserContext();
    const newPage = await context.newPage();
    newPage.setDefaultNavigationTimeout(0);
    logger.info(`File ${path} has been added.`);
    await uploadSingleCSV(newPage, APP_IDS.customers, 'custId', path);
    await Promise.all([
      deleteFile(path),
      newPage.close(),
    ]);
  } catch (e) {
    notifyDev(`handleFileWatcher ${e}`);
    browser.close();
  }
};

export const syncDoNetCust = async (isFullSync = false) => {
  const watcher = chokidar.watch(dumpPath, {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    persistent: true,
    depth: 0,
  });
  try {
    /** File watcher */


    process.setMaxListeners(20);
    const page = await openBrowserPage();
    const kintoneBrowser = page.browser();

    const uploadTasks : Promise<void>[] = [];

    watcher.on('add', (path)=>{
      uploadTasks.push(handleFileWatcher(path, kintoneBrowser));
    });

    await login(page);
    await navigateToCustPage(page);

    if (isFullSync) {
      logger.info('Starting full sync.');
      await downloadPerStore(page);
    } else {
      // Incremental Sync
      logger.info('Starting incremental sync.');

      await setCustForm(
        page, {
          chkStatus: false,
          dateStr: format(subDays(new Date(), 1), 'yyyy-MM-dd')},
      );
      await selectStoreThenSearch(page, '');
      await handleDownload(page);
    }

    // Wait a second to register all promises upload promises to stack.
    await page.waitForTimeout(1000);

    console.log('prmise', uploadTasks.length);
    await Promise.all(uploadTasks);


    await kintoneBrowser.close();
    await watcher.close();
  } catch (error: any) {
    await watcher.close();
    notifyDev(`Error with syncDoNetCust. ${error.message}`);
  }
};
