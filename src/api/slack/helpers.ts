/* eslint-disable max-len */
import {logger} from '../../utils';
import {slackChannels} from './config';

const resolveProdChannels = (storeName: string) => {
  const {
    nakagawa,
    toyokawa,
    toyohashi,
    toyota,
  } = slackChannels;

  const isIncludedInStore = (store: string) => {
    return storeName.includes(store);
  };

  if (['豊川', '八幡'].some(isIncludedInStore)) {
    return toyokawa;
  } else if (['豊橋'].some(isIncludedInStore)) {
    return toyohashi;
  } else if (['豊田'].some(isIncludedInStore)) {
    return toyota;
  } else if (['中川', '千種'].some(isIncludedInStore)) {
    return nakagawa;
  } else {
    return toyokawa;
  }
};

export const resolveChannel = (storeName: string) => {
  const prodChannel = resolveProdChannels(storeName);

  if (process.env.ENVIRONMENT === 'dev') {
    logger.info(`Test channel ${slackChannels.test}. Could have resolved to ${prodChannel} `);
    return slackChannels.test;
  }

  return prodChannel;
};
