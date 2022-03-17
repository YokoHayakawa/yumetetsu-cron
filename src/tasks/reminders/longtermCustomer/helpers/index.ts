
/* export const resolveChannel = (store: string) => {
  if (process.env.NODE_ENV === 'test') {
    console.log('Test environment');
    return process.env.SLACK_CHANNEL_ID_TEST;
  }

  if (['中川', '千種大久手'].some((item) => store.includes(item))) {
    return process.env.SLACK_CHANNEL_ID_NAKAGAWA;
  } else if (['豊橋', '藤沢'].some((item) => store.includes(item))) {
    return process.env.SLACK_CHANNEL_ID_TOYOHASHI;
  } else if (['豊川'].some((item) => store.includes(item))) {
    return process.env.SLACK_CHANNEL_ID_TOYOKAWA;
  } else if (['豊田'].some((item) => store.includes(item))) {
    return process.env.SLACK_CHANNEL_ID_TOYOTA;
  } else {
    return process.env.SLACK_CHANNEL_ID_TOYOKAWA;
  }
}; */
