import {ChatPostMessageResponse} from '@slack/web-api';
import {format} from 'date-fns';
import {APP_IDS, kintoneClient} from '../../../../api/kintone';
import {SlackSentStatus} from '../helpers';


export const markSuccess = (
  rec: LongTermCustomerType,
  slackResp: ChatPostMessageResponse,
  slackSentStatus: SlackSentStatus,
) =>{
  const {
    $id: id,
    追客可能時期: dueDate,
  } = rec;

  const {
    channel,
    ts,
  } = slackResp;

  // Don't update slackSentStatus if dueDate is empty
  const newSlackSentStatus = dueDate.value ? slackSentStatus + 1 : 0;

  return kintoneClient.record.updateRecord({
    app: APP_IDS.longTermCustomers,
    id: id.value,
    record: {
      slackSentStatus: {value: `${newSlackSentStatus}`},
      slackChannel: {value: channel},
      slackTS: {value: ts},
      sentToSlackDate: {value: format(new Date(), 'yyyy-MM-dd')},
    } as Partial<LongTermCustomerType>,
  });
};
