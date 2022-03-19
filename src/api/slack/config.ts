import {App} from '@slack/bolt';

export const slackApp = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

export const slackChannels = {
  toyokawa: process.env.SLACK_CHANNEL_ID_TOYOKAWA,
  toyohashi: process.env.SLACK_CHANNEL_ID_TOYOHASHI, //  'C02R6LKGVNY',
  toyota: process.env.SLACK_CHANNEL_ID_TOYOTA, // 'C034VNAHJCW',
  nakagawa: process.env.SLACK_CHANNEL_ID_NAKAGAWA, // 'C036G6A14DN',
  takahama: process.env.SLACK_CHANNEL_ID_TAKAHAMA, // 'C036G6A14DN',
  ogaki: process.env.SLACK_CHANNEL_ID_OGAKI, // 'C036G6A14DN',
  gamagori: process.env.SLACK_CHANNEL_ID_GAMAGORI, // 'C036G6A14DN',

  test: process.env.SLACK_CHANNEL_ID_TEST,
};

export const actionIds = {
  btnLongtermCustYes: 'btnLongtermCustYes',
  btnLongtermCustStopNotif: 'btnLongtermCustStopNotif',
};
