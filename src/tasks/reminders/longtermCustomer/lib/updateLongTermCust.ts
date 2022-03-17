import {ChatPostMessageResponse} from '@slack/web-api';
import {APP_IDS, kintoneClient} from '../../../../api/kintone';
import {SlackSentStatus} from '../helpers';


export const markSuccess = (
  rec: LongTermCustomerType,
  slackResp: ChatPostMessageResponse,
  slackSentStatus: SlackSentStatus,
) =>{
  const {
    $id: id,
  } = rec;

  const {
    channel,
    ts,
  } = slackResp;


  return kintoneClient.record.updateRecord({
    app: APP_IDS.longTermCustomers,
    id: id.value,
    record: {
      'slackSentStatus': {value: `${slackSentStatus + 1}`},
      'slackChannel': {value: channel},
      'slackTS': {value: ts},
    } as Partial<LongTermCustomerType>,
  });
};
