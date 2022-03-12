import {Page} from 'puppeteer';
import {getOptionsStore} from './content';
import {logger} from '../../../../../utils';
import {selectors} from '../../config';
import {clickSearch} from './clickSearch';
import {handleDownload} from './handleDownload';

export const downloadPerAgent = async (page: Page) =>{
  const agents = await getOptionsStore(page);

  for (const agent of agents) {
    logger.info(`Selected agent - ${agent.text} `);
    await page.select(selectors.ddAgents, agent.value);
    await clickSearch(page);
    await handleDownload(page);
  }

  return page;
};
