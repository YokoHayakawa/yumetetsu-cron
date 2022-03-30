import {format} from 'date-fns';
import {slackClient} from '../api/slack';

export const notifyDev = async (message: string) => {
  console.log('Notifying dev.');
  return await slackClient().chat.postMessage({
    channel: process.env.SLACK_CHANNEL_ID_DEV,
    text: message,
  });
};

export const formattedTime = () => format(new Date(), 'yyyy-MM-dd HH:mm:ss');
