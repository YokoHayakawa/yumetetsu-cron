import {launchBrowser, openBrowserPage} from '../common/browser';
import {login} from '../common/doNet/login';
import {navigateToCustPage} from '../common/doNet/pages/navigate';
import {
  downloadPerStore,
} from '../common/doNet/pages/customer/downloadPerStore';
import {uploadSingleCSV} from '../common/kintone/uploadCSV';
import {APP_IDS} from '../../api/kintone';
import chokidar from 'chokidar';
import {dumpPath, logger, notifyDev} from '../../utils';

const watcher = chokidar.watch(dumpPath, {
  ignored: /(^|[/\\])\../, // ignore dotfiles
  persistent: true,
});


export const syncDoNetCust = async () => {
  try {
    notifyDev('Running sync customer. ');
    process.setMaxListeners(20);
    const page = await openBrowserPage();
    const kintoneBrowser = await launchBrowser();


    watcher.on('add', async (path)=>{
      const context = await kintoneBrowser.createIncognitoBrowserContext();
      const newPage = await context.newPage();

      newPage.setDefaultNavigationTimeout(0);
      logger.info(`File ${path} has been added.`);
      await uploadSingleCSV(newPage, APP_IDS.customers, 'custId', path);
      await newPage.close();
    });

    await login(page);
    await navigateToCustPage(page);


    await downloadPerStore(page);
    // await uploadCSV(page, APP_IDS.customers, 'custId');

    await watcher.close();
    await kintoneBrowser.close();
    await page.close();
    notifyDev('Done running sync customer. ');
  } catch (error: any) {
    notifyDev(`Error with syncDoNetCust. ${error.message}`);
  }
};
