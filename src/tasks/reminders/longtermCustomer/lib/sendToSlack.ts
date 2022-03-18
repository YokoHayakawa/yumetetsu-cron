import {Block, KnownBlock} from '@slack/bolt';
import {slackApp} from '../../../../api/slack';
import {resolveChannel} from '../../../../api/slack/helpers';
import {globalInterval} from '../../../../config';
import {logger} from '../../../../utils';
import {getYearDiffFromToday} from '../../../../utils/dates';
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
    長期追客理由: dueDate,
  } = rec;

  const isActualHankyoDate = slackSentStatus === 1 || dueDate.value;
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
  const tasks = records.map((rec, idx) => {
    const {
      $id,
      追客可能時期: dueDate,
      receptionDate,
      sentToSlackDate,
    } = rec;

    /* Requirement: Send empty dueDate every year only. */
    if (!dueDate.value) {
      const dateToCompare = sentToSlackDate.value || receptionDate.value;
      const diffInYears = getYearDiffFromToday(dateToCompare);
      logger.info(`Due date is empty.${[
        $id.value, dateToCompare, diffInYears]
        .join(', ')}`);

      if (!diffInYears) {
        return;
      }
    }

    // Slack is generous in API calls even though it is generally free.
    // However, rate limiters might kick in so I used a timed promise.
    return new Promise(
      (resolve) => setTimeout(
        ()=> resolve(sendRecToSlack(rec, slackSentStatus)),
        idx * globalInterval,
      ),
    );
  });

  return Promise.all(tasks);
};

