import {slackApp} from '../api/slack';

export const notifyDev = (message: string) => {
  console.log(process.env.SLACK_CHANNEL_ID_DEV);
  slackApp.client.chat.postMessage({
    channel: process.env.SLACK_CHANNEL_ID_DEV,
    text: message,
  });
};
