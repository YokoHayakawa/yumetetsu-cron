import {slackCannels} from './config';


export const resolveChannel = (storeName: string) => {
  const isIncludedInStore = (store: string) => {
    return storeName.includes(store);
  };

  if (['豊川', '八幡'].some(isIncludedInStore)) {
    return slackCannels.toyokawa;
  } else if (['豊橋'].some(isIncludedInStore)) {
    return slackCannels.toyohashi;
  } else if (['豊田'].some(isIncludedInStore)) {
    return slackCannels.toyota;
  } else if (['中川', '千種'].some(isIncludedInStore)) {
    return slackCannels.nakagawa;
  } else {
    return slackCannels.toyokawa;
  }
};
