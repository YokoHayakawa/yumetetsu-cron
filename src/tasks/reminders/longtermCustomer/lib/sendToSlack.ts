import {Block, KnownBlock} from '@slack/bolt';
import {slackApp} from '../../../../api/slack';
import {resolveChannel} from '../../../../api/slack/helpers';
import {globalInterval} from '../../../../config';
import {SlackSentStatus} from '../helpers';
import {
  footNote,
  header,
  longtermReason,
  mainContents,
  notesAndCancelReason} from './messageParts';

import {markSuccess} from './updateLongTermCust';


type FnMessageBlock = (
  record: LongTermCustomerType,
  textHeader: string
) => (Block | KnownBlock)[]

const messageBlock: FnMessageBlock = (record, textHeader) => {
  const messageBlock = [
    ...header(textHeader),
    ...mainContents(record),
    ...notesAndCancelReason(record),
    ...longtermReason(record),
    ...footNote(record),
  ];

  return messageBlock;
};


const sendRecToSlack = async (
  rec: LongTermCustomerType,
  slackSentStatus: SlackSentStatus,
) => {
  const {
    店舗名: storeName,

  } = rec;

  const isActualHankyoDate = slackSentStatus === 1;
  const textHeader = `追客可能時期${isActualHankyoDate ? 'となりました' : '３ヶ月前以上です'}!`;

  const resp = await slackApp.client.chat.postMessage({
    channel: resolveChannel(storeName.value),
    text: textHeader,
    blocks: messageBlock(rec, textHeader),
  });

  if (resp.ok) await markSuccess(rec, resp, slackSentStatus);
};

/**
 * Send formatted records to Slack, then mark the record that
 * it is already sent.
 *
 * This is failsafe when the record is scheduled
 * to be sent but, an error or server fault occured.
 * @param records kintone records
 * @param slackSentStatus as named.
 */
export default async (
  records: LongTermCustomerType[],
  slackSentStatus: SlackSentStatus,
) => {
  // Slack is generous in API calls even though it is generally free.
  // However, rate limiters might kick in so I'm using a timed promise here.
  const tasks = records.map((rec, idx) => {
    return new Promise(
      (resolve) => setTimeout(
        ()=> resolve(sendRecToSlack(rec, slackSentStatus)),
        idx * globalInterval,
      ),
    );
  });

  return Promise.all(tasks);
};

