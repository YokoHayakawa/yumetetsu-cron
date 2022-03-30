import {Block, KnownBlock} from '@slack/bolt';
import {slackClient} from '../../../../api/slack';
import {resolveChannel} from '../../../../api/slack/helpers';
import {globalInterval} from '../../../../config';
import {isSameMonthDay} from '../../../../utils/dates';
import {SlackSentStatus} from '../helpers';
import {
  actions,
  footNote,
  header,
  longtermReason,
  mainContents,
  notesAndCancelReason} from './messageParts';

import {markSuccess} from './markSuccess';
import {logger} from '../../../../utils';


type FnMessageBlock = (
  record: LongTermCustomerType,
  textHeader: string
) => (Block | KnownBlock)[]

const messageBlock: FnMessageBlock = (record, textHeader) => {
  /* Divided by parts so I can flexibly rearrange them. */
  const messageBlock = [
    ...header(textHeader),
    ...mainContents(record),
    ...notesAndCancelReason(record),
    ...longtermReason(record),
    ...actions(record),
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
    追客可能時期: dueDate,
  } = rec;


  const isActualHankyoDate = slackSentStatus === 1 || !dueDate.value;

  const textHeader = `追客可能時期${isActualHankyoDate ? 'となりました' : '３ヶ月前です'}!`;
  logger.info(`Evaluated header ${[textHeader,
    isActualHankyoDate,
    dueDate.value].join('--')
  }`);

  const isDevEnvironment = process.env.ENVIRONMENT === 'dev';

  const resp = await slackClient().chat.postMessage({
    channel: resolveChannel(storeName.value),
    text: textHeader,
    blocks: messageBlock(rec, textHeader),
  });

  if (resp.ok && !isDevEnvironment) {
    return await markSuccess(rec, resp, slackSentStatus);
  }
};


/**
 * Send formatted records to Slack, then mark the record that
 * it already sent.
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
  logger.info(`sendToSlack: received ${records.length} records.`);
  for (const rec of records) {
    const {
      receptionDate,
      追客可能時期: dueDate,
    } = rec;


    if (
      slackSentStatus === 1 || // Notify on actual date
      (slackSentStatus === 0 && !!dueDate.value) || // Notify 3 months before
      isSameMonthDay(receptionDate.value) // Notify every year
    ) {
      console.log('3months before?', slackSentStatus === 0 && !!dueDate.value);
      await new Promise(
        (resolve) => setTimeout(
          ()=> resolve(sendRecToSlack(rec, slackSentStatus)),
          globalInterval,
        ),
      );
    }
  }
};

/**
 * Requirements definition
 *
 * With dueDate
 *
 * - Notify 3 months before
 * slackSentStatus === 0 and 3 months before dueDate
 * - Notify on actual date
 * slackSentStatus === 1 and within 0 - 2.99 months
 *
 * Without dueDate
 * - Notify every year on the same month and day
 * slackSentStatus === 0 and dueDate === ""
 *  */
