import {launchBrowser, openBrowserPage} from '../common/browser';
import {login} from '../common/doNet/login';
import {navigateToCustPage} from '../common/doNet/pages/navigate';
import {
  downloadPerStore, selectStoreThenSearch,
} from '../common/doNet/pages/customer/downloadPerStore';
import {uploadSingleCSV} from '../common/kintone/uploadCSV';
import {APP_IDS} from '../../api/kintone';
import chokidar from 'chokidar';
import {dumpPath, logger, notifyDev} from '../../utils';
import {setCustForm} from '../common/doNet/pages/customer/setCustForm';

import {format, subDays} from 'date-fns';
import {handleDownload} from '../common/doNet/pages/customer/handleDownload';


export const syncDoNetCust = async (isFullSync = false) => {
  try {
    /** File watcher */
    const watcher = chokidar.watch(dumpPath, {
      ignored: /(^|[/\\])\../, // ignore dotfiles
      persistent: true,
      depth: 0,
    });

    process.setMaxListeners(20);
    const page = await openBrowserPage();
    const kintoneBrowser = await launchBrowser();

    const uploadTasks : Promise<void>[] = [];

    watcher.on('add', async (path)=>{
      uploadTasks.push((async ()=>{
        const context = await kintoneBrowser.createIncognitoBrowserContext();
        const newPage = await context.newPage();
        newPage.setDefaultNavigationTimeout(0);
        logger.info(`File ${path} has been added.`);
        await uploadSingleCSV(newPage, APP_IDS.customers, 'custId', path);
        await newPage.close();
      })(),
      );
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


    await Promise.all(uploadTasks);
    await kintoneBrowser.close();

    await page.close();
    await watcher.close();
  } catch (error: any) {
    notifyDev(`Error with syncDoNetCust. ${error.message}`);
  }
};
