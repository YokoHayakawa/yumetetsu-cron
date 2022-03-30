/* eslint-disable max-len */
import {Block} from '@slack/bolt';
import {slackClient} from './config';

/**
 * @deprecated
 * Just for testing
 * */
export const updateMessage = async () =>{
  const ts ='1647755100.060059';
  const messageContent = await slackClient().conversations.history({
    channel: 'C034VNAHJCW',
    latest: ts,
    limit: 1,
    inclusive: true,
  });

  const block = messageContent.messages!['0'].blocks;

  block![2].elements![0].action_id = 'hankyoContents';

  console.log('Block', block![2].elements![0]);
  await slackClient().chat.update({
    ts: ts,
    channel: 'C034VNAHJCW',
    blocks: block as Block[],
  });

  return messageContent;
};
