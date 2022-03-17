import {App} from '@slack/bolt';

export const slackApp = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

export const slackCannels = {
  toyokawa: 'C02QPP4DYS3',
  toyohashi: 'C02R6LKGVNY',
  toyota: 'C034VNAHJCW',
  nakagawa: 'C036G6A14DN',
};

